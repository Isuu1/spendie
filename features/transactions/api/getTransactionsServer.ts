import { createClient } from "@/supabase/server";
import { Transaction, TransactionsGetRequest } from "plaid";
import plaidClient from "@/shared/lib/plaid";
import moment from "moment";

type TransactionsResult = {
  transactions: Transaction[];
  error?: string | null;
};

export async function getTransactionsServer(): Promise<TransactionsResult> {
  try {
    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error("Error fetching user:", authError);
      throw new Error("Failed to fetch user data");
    }

    const userId = authData.user.id;

    const { data: plaidItems, error: fetchError } = await supabase
      .from("plaid_items")
      .select("access_token")
      .eq("user_id", userId);

    if (fetchError) {
      console.error(
        "Server-side getTransactions Function: Supabase fetch error for plaid_items:",
        fetchError
      );
      return {
        transactions: [],
        error: "Database error: Failed to fetch Plaid items",
      };
    }

    if (!plaidItems || plaidItems.length === 0) {
      return {
        transactions: [],
        error: "Database error: No linked transactions found",
      };
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

    if (!response) {
      console.error("Error fetching transactions from Plaid");
      return {
        transactions: [],
        error: "Failed to fetch transactions from Plaid",
      };
    }

    return {
      transactions: response.data.transactions,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("An unexpected error occurred while fetching transactions");
  }
}
