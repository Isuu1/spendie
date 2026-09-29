import { NextResponse } from "next/server";

import plaidClient from "@/shared/lib/plaid";
import { createAdminClient } from "@/supabase/admin";

export async function POST() {
  try {
    const supabase = createAdminClient();

    // Get the first connected Plaid Item for testing
    const { data: plaidItem, error } = await supabase
      .from("plaid_items")
      .select("id, access_token, status")
      .eq("status", "connected")
      .limit(1)
      .single();

    if (error || !plaidItem) {
      return NextResponse.json(
        { error: "No connected Plaid Item found" },
        { status: 404 },
      );
    }

    const response = await plaidClient.sandboxItemResetLogin({
      access_token: plaidItem.access_token,
    });

    return NextResponse.json({
      success: true,
      plaidItemDbId: plaidItem.id,
      previousStatus: plaidItem.status,
      resetLogin: response.data.reset_login,
      requestId: response.data.request_id,
    });
  } catch (error) {
    console.error("Failed to reset Plaid Item login:", error);

    return NextResponse.json(
      { error: "Failed to reset Plaid Item login" },
      { status: 500 },
    );
  }
}
