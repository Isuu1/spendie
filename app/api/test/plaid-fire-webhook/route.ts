import { NextResponse } from "next/server";

import plaidClient from "@/shared/lib/plaid";

import { createAdminClient } from "@/supabase/admin";

import {
  SandboxItemFireWebhookRequestWebhookCodeEnum,
  WebhookType,
} from "plaid";

export async function POST() {
  try {
    const supabase = createAdminClient();

    // Get a Plaid Item for testing
    const { data: plaidItem, error } = await supabase
      .from("plaid_items")
      .select("id, access_token, plaid_item_id")
      .limit(1)
      .single();

    if (error || !plaidItem) {
      console.error("Could not find Plaid Item:", error);

      return NextResponse.json(
        { error: "Plaid Item not found" },
        { status: 404 },
      );
    }

    // Fire a TRANSACTIONS SYNC_UPDATES_AVAILABLE webhook
    const response = await plaidClient.sandboxItemFireWebhook({
      access_token: plaidItem.access_token,
      webhook_type: WebhookType.Transactions,
      webhook_code:
        SandboxItemFireWebhookRequestWebhookCodeEnum.SyncUpdatesAvailable,
    });

    console.log("Plaid webhook fired:", {
      plaidItemDbId: plaidItem.id,
      plaidItemId: plaidItem.plaid_item_id,
      requestId: response.data.request_id,
    });

    return NextResponse.json({
      success: true,
      plaidItemDbId: plaidItem.id,
      requestId: response.data.request_id,
    });
  } catch (error) {
    console.error("Error firing Plaid webhook:", error);

    return NextResponse.json(
      { error: "Failed to fire Plaid webhook" },
      { status: 500 },
    );
  }
}
