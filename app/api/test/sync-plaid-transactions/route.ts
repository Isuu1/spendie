// Temporary Sandbox testing route.
// Do not use in production.

import { NextResponse } from "next/server";
import plaidClient from "@/shared/lib/plaid";
import { createAdminClient } from "@/supabase/admin";

export async function POST() {
  try {
    const supabase = createAdminClient();

    const { data: plaidItem, error } = await supabase
      .from("plaid_items")
      .select("id, access_token, plaid_item_id")
      .eq("id", 75)
      .single();

    if (error || !plaidItem) {
      console.error("Could not find Plaid Item:", error);

      return NextResponse.json(
        { error: "Plaid Item not found" },
        { status: 404 },
      );
    }

    const response = await plaidClient.transactionsSync({
      access_token: plaidItem.access_token,
    });

    console.log({
      added: response.data.added,
      modified: response.data.modified,
      removed: response.data.removed,
      nextCursor: response.data.next_cursor,
      hasMore: response.data.has_more,
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
