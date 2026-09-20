import { NextResponse } from "next/server";

import plaidClient from "@/shared/lib/plaid";

import { createAdminClient } from "@/supabase/admin";

export async function POST() {
  try {
    const supabase = createAdminClient();

    const { data: plaidItem, error } = await supabase
      .from("plaid_items")
      .select("id, access_token, plaid_item_id")
      .eq("id", 65)
      .single();

    if (error || !plaidItem) {
      console.error("Could not find Plaid Item:", error);

      return NextResponse.json(
        { error: "Plaid Item not found" },
        { status: 404 },
      );
    }

    const response = await plaidClient.sandboxTransactionsCreate({
      access_token: plaidItem.access_token,
      transactions: [
        {
          amount: 25.5,
          date_posted: "2026-09-20",
          date_transacted: "2026-09-20",
          description: "Spendie Webhook Test",
        },
      ],
    });

    console.log("Sandbox transaction created:", {
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
    console.error("Error creating Sandbox transaction:", error);

    return NextResponse.json(
      { error: "Failed to create Sandbox transaction" },
      { status: 500 },
    );
  }
}
