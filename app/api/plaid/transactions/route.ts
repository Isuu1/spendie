import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

import { TransactionsGetRequest } from "plaid";
import moment from "moment"; // Or another date handling library
import plaidClient from "@/shared/lib/plaid";
import { Transaction } from "@/shared/types/transaction";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error("Error fetching user:", authError);
      throw new Error("Failed to fetch user data");
    }

    // Fetch the user's Plaid items from your database
    const { data: plaidItems, error: fetchError } = await supabase
      .from("plaid_items")
      .select("access_token")
      .eq("user_id", authData.user.id);

    if (fetchError) {
      console.error("Error fetching Plaid items:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch Plaid items" },
        { status: 500 }
      );
    }

    if (!plaidItems || plaidItems.length === 0) {
      return NextResponse.json(
        { error: "No linked Plaid items found for this user" },
        { status: 404 }
      );
    }

    const accessToken = plaidItems[0].access_token;
    const startDate = moment().subtract(30, "days").format("YYYY-MM-DD"); // Example: last 30 days
    const endDate = moment().format("YYYY-MM-DD");

    const plaidRequest: TransactionsGetRequest = {
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
      options: {
        // Optional: specify options like count, offset, etc.
      },
    };

    const response = await plaidClient.transactionsGet(plaidRequest);

    return NextResponse.json(response.data.transactions as Transaction[]);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
