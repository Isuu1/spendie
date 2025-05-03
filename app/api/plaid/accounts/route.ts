import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

import { AccountsGetRequest } from "plaid";
import plaidClient from "@/shared/lib/plaid";
import { Account } from "@/shared/types/account";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const supabase = await createClient();

    // Fetch the user's Plaid items from your database
    const { data: plaidItems, error: fetchError } = await supabase
      .from("plaid_items")
      .select("access_token")
      .eq("user_id", userId);

    if (fetchError || !plaidItems || plaidItems.length === 0) {
      return NextResponse.json(
        { error: "No linked Plaid items found for this user" },
        { status: 404 }
      );
    }

    const accounts: Account[] = [];

    // Iterate over each linked item and fetch accounts
    for (const item of plaidItems) {
      const accessToken = item.access_token;

      const plaidRequest: AccountsGetRequest = {
        access_token: accessToken,
        options: {
          // Optional: specify options like count, offset, etc.
        },
      };

      const response = await plaidClient.accountsGet(plaidRequest);
      accounts.push(...response.data.accounts);
    }

    return NextResponse.json(accounts);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
