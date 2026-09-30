import { NextResponse } from "next/server";

import { verifyPlaidWebhook } from "@/shared/plaid/api/verifyPlaidWebhook";
import { syncPlaidTransactions } from "@/shared/plaid/api/syncPlaidTransactions";
import { createAdminClient } from "@/supabase/admin";
import { releasePlaidItemSyncLock } from "@/shared/plaid/api/plaidItemSyncLock";
import { acquireLockWithRetry } from "@/shared/plaid/utils/acquireLockWithRetry";

async function updatePlaidItemStatus(
  supabase: ReturnType<typeof createAdminClient>,
  plaidItemId: string,
  status: "connected" | "needs_reauth" | "disconnected" | "revoked",
) {
  const { error } = await supabase
    .from("plaid_items")
    .update({ status })
    .eq("plaid_item_id", plaidItemId)
    .neq("status", "disconnected")
    .select("id, plaid_item_id, status");

  if (error) {
    console.error("Failed to update Plaid Item status:", {
      plaidItemId,
      status,
      error,
    });

    throw new Error("Failed to update Plaid Item status");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.text();

    const verificationHeader = request.headers.get("Plaid-Verification");

    if (!verificationHeader) {
      return NextResponse.json(
        { error: "Missing Plaid verification header" },
        { status: 401 },
      );
    }

    const isValid = await verifyPlaidWebhook(body, verificationHeader);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid Plaid webhook" },
        { status: 401 },
      );
    }

    const webhook = JSON.parse(body);

    //Use admin client to access the database without user context
    const supabase = createAdminClient();

    if (webhook.webhook_type === "ITEM") {
      switch (webhook.webhook_code) {
        case "ERROR": {
          if (webhook.error?.error_code === "ITEM_LOGIN_REQUIRED") {
            await updatePlaidItemStatus(
              supabase,
              webhook.item_id,
              "needs_reauth",
            );
          } else {
            console.warn("Unhandled Plaid Item error:", {
              itemId: webhook.item_id,
              errorCode: webhook.error?.error_code,
              errorType: webhook.error?.error_type,
            });
          }

          break;
        }

        case "LOGIN_REPAIRED": {
          await updatePlaidItemStatus(supabase, webhook.item_id, "connected");

          break;
        }

        case "PENDING_EXPIRATION": {
          await updatePlaidItemStatus(
            supabase,
            webhook.item_id,
            "needs_reauth",
          );

          break;
        }

        case "USER_PERMISSION_REVOKED": {
          await updatePlaidItemStatus(supabase, webhook.item_id, "revoked");

          break;
        }

        default:
          console.log("Unhandled Plaid Item webhook:", {
            itemId: webhook.item_id,
            webhookCode: webhook.webhook_code,
          });
      }
      return NextResponse.json({ received: true });
    }

    if (
      webhook.webhook_type !== "TRANSACTIONS" ||
      webhook.webhook_code !== "SYNC_UPDATES_AVAILABLE"
    ) {
      return NextResponse.json({ received: true });
    }

    const { data: plaidItem, error: plaidItemError } = await supabase
      .from("plaid_items")
      .select("id")
      .eq("plaid_item_id", webhook.item_id)
      .maybeSingle();

    if (plaidItemError || !plaidItem) {
      console.error(
        "Could not find Plaid Item for webhook:",
        webhook.item_id,
        plaidItemError,
      );

      return NextResponse.json(
        { error: "Plaid Item not found" },
        { status: 404 },
      );
    }

    const plaidItemDbId = String(plaidItem.id);

    //!LOCK LIFECYCLE!//
    //Acquire a lock to ensure that only one sync operation is performed for this Plaid Item at a time.
    //Retry acquiring the lock before allowing Plaid to retry the webhook.
    const lockAcquired = await acquireLockWithRetry(plaidItemDbId);

    if (!lockAcquired) {
      return NextResponse.json(
        { error: "Plaid Item is currently being synced" },
        { status: 503 },
      );
    }

    try {
      await syncPlaidTransactions(plaidItemDbId);
    } finally {
      try {
        await releasePlaidItemSyncLock(plaidItemDbId);
      } catch (error) {
        console.error("Failed to release Plaid Item sync lock:", {
          error,
          plaidItemDbId,
        });
      }
    }
    return NextResponse.json({ received: true });
    //!LOCK LIFECYCLE!//
  } catch (error) {
    console.error("Error handling Plaid webhook:", error);

    return NextResponse.json(
      { error: "Failed to handle Plaid webhook" },
      { status: 500 },
    );
  }
}
