import { NextResponse } from "next/server";

import { SandboxItemFireWebhookRequestWebhookCodeEnum } from "plaid";

import { createClient } from "@/supabase/server";
import plaidClient from "@/shared/lib/plaid";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    // Get the Supabase plaid_items.id from the request
    const { plaidItemDbId } = await request.json();

    if (!plaidItemDbId) {
      return NextResponse.json(
        { error: "Missing plaidItemDbId" },
        { status: 400 },
      );
    }

    // Get the Plaid access token for this user's Item
    const { data: plaidItem, error: plaidItemError } = await supabase
      .from("plaid_items")
      .select("access_token")
      .eq("id", plaidItemDbId)
      .eq("user_id", user.id)
      .single();

    if (plaidItemError || !plaidItem) {
      console.error("Error fetching Plaid item:", plaidItemError);

      return NextResponse.json(
        { error: "Plaid item not found" },
        { status: 404 },
      );
    }

    // Ask Plaid Sandbox to fire SYNC_UPDATES_AVAILABLE
    const response = await plaidClient.sandboxItemFireWebhook({
      access_token: plaidItem.access_token,
      webhook_code:
        SandboxItemFireWebhookRequestWebhookCodeEnum.SyncUpdatesAvailable,
    });

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error firing Plaid webhook:", error);

    return NextResponse.json(
      { error: "Failed to fire Plaid webhook" },
      { status: 500 },
    );
  }
}
