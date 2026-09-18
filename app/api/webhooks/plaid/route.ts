import { NextResponse } from "next/server";

import { verifyPlaidWebhook } from "@/shared/plaid/api/verifyPlaidWebhook";
import { syncPlaidTransactions } from "@/shared/plaid/api/syncPlaidTransactions";
import { createAdminClient } from "@/supabase/admin";
import {
  acquirePlaidItemSyncLock,
  releasePlaidItemSyncLock,
} from "@/shared/plaid/api/plaidItemSyncLock";

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

    if (
      webhook.webhook_type !== "TRANSACTIONS" ||
      webhook.webhook_code !== "SYNC_UPDATES_AVAILABLE"
    ) {
      return NextResponse.json({ received: true });
    }

    //Use admin client to access the database without user context
    const supabase = createAdminClient();

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
    // Acquire a lock to ensure that only one sync operation is performed for this Plaid Item at a time
    const lockAcquired = await acquirePlaidItemSyncLock(plaidItemDbId);

    // If the lock is not acquired, it means another sync operation is already in progress for this Plaid Item
    if (!lockAcquired) {
      console.log(`Plaid Item ${plaidItemDbId} is already being synced.`);

      return NextResponse.json({ received: true });
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
