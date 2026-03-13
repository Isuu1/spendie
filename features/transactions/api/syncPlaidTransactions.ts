import { createClient } from "@/supabase/server";
import plaidClient from "@/shared/lib/plaid";
import dayjs from "dayjs";
import { TransactionsGetRequest } from "plaid";

export async function syncPlaidTransactions(userId: string) {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("plaid_items")
    .select("access_token")
    .eq("user_id", userId);

  if (!items || items.length === 0) return;

  const accessToken = items[0].access_token;

  const startDate = dayjs().subtract(30, "days").format("YYYY-MM-DD"); // Example: last 30 days
  const endDate = dayjs().format("YYYY-MM-DD");

  const plaidRequest: TransactionsGetRequest = {
    access_token: accessToken,
    start_date: startDate,
    end_date: endDate,
    options: {
      // Optional: specify options like count, offset, etc.
    },
  };

  const response = await plaidClient.transactionsGet(plaidRequest);

  const transactions = response.data.transactions;

  for (const tx of transactions) {
    const { error } = await supabase.from("transactions").upsert({
      plaid_transaction_id: tx.transaction_id,
      account_id: tx.account_id,
      amount: tx.amount,
      name: tx.name,
      date: tx.date,
      pending: tx.pending,
      category: tx.personal_finance_category?.primary,
      image_url: tx.personal_finance_category_icon_url,
      iso_currency_code: tx.iso_currency_code,
      user_id: userId,
    });

    if (error) {
      console.error("Error syncing Plaid transactions:", error);
    }
  }
}
