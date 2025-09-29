import { createClient } from "@/supabase/server";
import { TransactionsGetRequest } from "plaid";
import plaidClient from "@/shared/lib/plaid";
import moment from "moment";
import { Transaction } from "@/shared/types/transaction";

export async function getTransactionsServer() {
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

    if (fetchError || !plaidItems || plaidItems.length === 0) {
      console.error(
        "Server-side getAccounts Function: Supabase fetch error for plaid_items:",
        fetchError
      );
      return;
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

    return response.data.transactions as Transaction[];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}
