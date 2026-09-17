import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import plaidClient from "@/shared/lib/plaid";
import {
  SandboxItemFireWebhookRequestWebhookCodeEnum,
  WebhookType,
} from "plaid";

export async function POST() {
  try {
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: plaidItem, error: plaidItemError } = await supabase
      .from("plaid_items")
      .select("id, plaid_item_id, access_token")
      .eq("user_id", userData.user.id)
      .limit(1)
      .single();

    if (plaidItemError || !plaidItem) {
      return NextResponse.json(
        { error: "Plaid Item not found" },
        { status: 404 },
      );
    }

    const response = await plaidClient.sandboxItemFireWebhook({
      access_token: plaidItem.access_token,
      webhook_type: WebhookType.Transactions,
      webhook_code:
        SandboxItemFireWebhookRequestWebhookCodeEnum.SyncUpdatesAvailable,
    });

    console.log("Sandbox webhook fired:", response.data);

    return NextResponse.json({
      success: true,
      plaidItemDbId: plaidItem.id,
      plaidItemId: plaidItem.plaid_item_id,
      webhook: response.data,
    });
  } catch (error) {
    console.error("Error firing Sandbox webhook:", error);

    return NextResponse.json(
      { error: "Failed to fire Sandbox webhook" },
      { status: 500 },
    );
  }
}
