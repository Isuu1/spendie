import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

import { TransactionsGetRequest } from "plaid";
import moment from "moment"; // Or another date handling library
import plaidClient from "@/shared/lib/plaid";
import { Transaction } from "@/shared/types/transaction";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    console.log("User ID:", userId);

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

    const transactions: Transaction[] = [];

    // Iterate over each linked item and fetch transactions
    for (const item of plaidItems) {
      const accessToken = item.access_token;

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
      transactions.push(...response.data.transactions);
    }

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
