import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import plaidClient from "@/shared/lib/plaid";

export async function POST() {
  try {
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: plaidItem, error: plaidItemError } = await supabase
      .from("plaid_items")
      .select("id, access_token")
      .eq("user_id", userData.user.id)
      .limit(1)
      .single();

    if (plaidItemError || !plaidItem) {
      return NextResponse.json(
        { error: "Plaid Item not found" },
        { status: 404 },
      );
    }

    const response = await plaidClient.itemGet({
      access_token: plaidItem.access_token,
    });

    console.log("Plaid Item:", {
      item_id: response.data.item.item_id,
      products: response.data.item.products,
      billed_products: response.data.item.billed_products,
      //transactions: response.data.item.status?.transactions,
    });

    const response2 = await plaidClient.accountsGet({
      access_token: plaidItem.access_token,
    });

    console.log(
      "Plaid accounts:",
      response2.data.accounts.map((account) => ({
        account_id: account.account_id,
        name: account.name,
        type: account.type,
        subtype: account.subtype,
      })),
    );

    return NextResponse.json({
      success: true,
      item: {
        item_id: response.data.item.item_id,
        products: response.data.item.products,
        billed_products: response.data.item.billed_products,
        //transactions: response.data.item.status?.transactions,
      },
    });
  } catch (error) {
    console.error("Error fetching Plaid Item:", error);

    return NextResponse.json(
      { error: "Failed to fetch Plaid Item" },
      { status: 500 },
    );
  }
}
