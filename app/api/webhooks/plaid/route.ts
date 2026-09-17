import { NextResponse } from "next/server";

import { verifyPlaidWebhook } from "@/shared/plaid/api/verifyPlaidWebhook";
import { syncPlaidTransactions } from "@/shared/plaid/api/syncPlaidTransactions";
import { createAdminClient } from "@/supabase/admin";

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
      .single();

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

    await syncPlaidTransactions(String(plaidItem.id));

    console.log("🔥 NEW WEBHOOK CODE RUNNING");

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling Plaid webhook:", error);

    return NextResponse.json(
      { error: "Failed to handle Plaid webhook" },
      { status: 500 },
    );
  }
}
