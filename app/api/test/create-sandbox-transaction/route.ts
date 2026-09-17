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
      .select("id, plaid_item_id, access_token")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    if (plaidItemError || !plaidItem) {
      return NextResponse.json(
        { error: "No Plaid Item found" },
        { status: 404 },
      );
    }

    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .select("plaid_account_id")
      .eq("plaid_item_db_id", plaidItem.id)
      .limit(1)
      .single();

    if (accountError || !account) {
      return NextResponse.json(
        { error: "No account found for Plaid Item" },
        { status: 404 },
      );
    }

    const response = await plaidClient.sandboxTransactionsCreate({
      access_token: plaidItem.access_token,
      transactions: [
        {
          amount: 25.5,
          date_transacted: new Date().toISOString().split("T")[0],
          date_posted: new Date().toISOString().split("T")[0],
          description: "Spendie Cursor Test",
          iso_currency_code: "USD",
        },
      ],
    });

    console.log("Sandbox transaction created:", response.data);

    return NextResponse.json({
      success: true,
      plaidItemDbId: plaidItem.id,
      plaidItemId: plaidItem.plaid_item_id,
      transaction: response.data,
    });
  } catch (error) {
    console.error("Error creating Sandbox transaction:", error);

    return NextResponse.json(
      { error: "Failed to create Sandbox transaction" },
      { status: 500 },
    );
  }
}
