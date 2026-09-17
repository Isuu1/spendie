import { NextResponse } from "next/server";

import { createClient } from "@/supabase/server";
import plaidClient from "@/shared/lib/plaid";

export async function POST() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: plaidItem, error: plaidItemError } = await supabase
      .from("plaid_items")
      .select("access_token")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    if (plaidItemError || !plaidItem) {
      return NextResponse.json(
        { error: "No Plaid Item found" },
        { status: 404 },
      );
    }

    const response = await plaidClient.transactionsGet({
      access_token: plaidItem.access_token,
      start_date: "2026-01-01",
      end_date: "2026-12-31",
    });

    // console.log("Transactions get response:", {
    //   total: response.data.total_transactions,
    //   transactions: response.data.transactions,
    // });

    return NextResponse.json({
      success: true,
      total: response.data.total_transactions,
      transactions: response.data.transactions,
    });
  } catch (error) {
    console.error("Error getting Plaid transactions:", error);

    return NextResponse.json(
      { error: "Failed to get Plaid transactions" },
      { status: 500 },
    );
  }
}
