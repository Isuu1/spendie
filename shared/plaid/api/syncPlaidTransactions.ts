import { createClient } from "@/supabase/server";
import plaidClient from "@/shared/lib/plaid";
import { TransactionsSyncRequest } from "plaid";

export async function syncPlaidTransactions(userId: string) {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("plaid_items")
    .select("id, plaid_item_id, access_token, plaid_cursor")
    .eq("user_id", userId);

  if (!items || items.length === 0) return;

  // Loop through each item and sync transactions
  for (const item of items) {
    const accessToken = item.access_token;
    let currentCursor = item.plaid_cursor || null;
    let hasMore = true;

    //1. Get accounts for the item to map Plaid account IDs to Spendie account IDs in db
    const { data: accounts, error: accountsError } = await supabase
      .from("accounts")
      .select("id, plaid_account_id")
      .eq("plaid_item_db_id", item.id);

    if (accountsError) {
      console.error("Error fetching accounts:", accountsError);
      throw new Error("Failed to fetch accounts");
    }

    //2. Create a map of Plaid account IDs to Spendie account IDs for quick lookup
    const accountMap = new Map(
      (accounts ?? []).map((account) => [account.plaid_account_id, account.id]),
    );

    //3. Loop through paginated results until all transactions are synced
    while (hasMore) {
      const plaidRequest: TransactionsSyncRequest = {
        access_token: accessToken,
        cursor: currentCursor,
      };

      const response = await plaidClient.transactionsSync(plaidRequest);

      const { added, modified, removed, next_cursor, has_more } = response.data;

      const updates = [...added, ...modified];

      //4. Upsert new and modified transactions into the database
      for (const tx of updates) {
        const displayName = tx.merchant_name ?? tx.name;

        //5. Find the corresponding Spendie account ID for the Plaid account ID
        const accountId = accountMap.get(tx.account_id);

        if (!accountId) {
          console.error(
            `Could not find Spendie account for Plaid account ${tx.account_id}`,
          );

          continue;
        }

        const { error } = await supabase.from("transactions").upsert({
          plaid_transaction_id: tx.transaction_id,
          amount: tx.amount,
          name: displayName,
          original_name: tx.name,
          merchant_name: tx.merchant_name,
          date: tx.date,
          pending: tx.pending,
          category: tx.personal_finance_category?.primary,
          iso_currency_code: tx.iso_currency_code,
          user_id: userId,

          account_id: accountId, //FK -> accounts.id
        });

        if (error) {
          console.error("Error syncing Plaid transactions:", error);
        }
      }

      //6. Remove transactions that have been deleted in Plaid
      if (removed && removed.length > 0) {
        const removedIds = removed.map((tx) => tx.transaction_id);

        const { error } = await supabase
          .from("transactions")
          .delete()
          .in("plaid_transaction_id", removedIds);

        if (error)
          console.error("Error removing cancelled transactions:", error);
      }
      //7. Update cursor and hasMore for next iteration
      currentCursor = next_cursor;
      hasMore = has_more;
    }

    //8. Update the cursor in the database for this item
    await supabase
      .from("plaid_items")
      .update({ plaid_cursor: currentCursor })
      .eq("id", item.id);
  }
}
