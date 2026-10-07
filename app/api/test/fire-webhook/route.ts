import { NextResponse } from "next/server";

import { SandboxItemFireWebhookRequest } from "plaid";

import plaidClient from "@/shared/lib/plaid";
import { createAdminClient } from "@/supabase/admin";

export async function POST() {
  try {
    const supabase = createAdminClient();

    // Get a connected Plaid Item for testing
    const { data: plaidItem, error } = await supabase
      .from("plaid_items")
      .select("id, plaid_item_id, access_token, status")
      .eq("status", "connected")
      .limit(1)
      .single();

    if (error || !plaidItem) {
      return NextResponse.json(
        { error: "No connected Plaid Item found" },
        { status: 404 },
      );
    }

    const webhookRequest: SandboxItemFireWebhookRequest = {
      access_token: plaidItem.access_token,
      webhook_code:
        "SYNC_UPDATES_AVAILABLE" as SandboxItemFireWebhookRequest["webhook_code"],
    };

    const response = await plaidClient.sandboxItemFireWebhook(webhookRequest);

    return NextResponse.json({
      success: true,
      plaidItemDbId: plaidItem.id,
      plaidItemId: plaidItem.plaid_item_id,
      previousStatus: plaidItem.status,
      webhookCode: "SYNC_UPDATES_AVAILABLE",
      requestId: response.data.request_id,
    });
  } catch (error) {
    console.error("Failed to fire Plaid webhook:", error);

    return NextResponse.json(
      { error: "Failed to fire Plaid webhook" },
      { status: 500 },
    );
  }
}
