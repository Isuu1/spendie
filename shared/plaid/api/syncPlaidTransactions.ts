import { createClient } from "@/supabase/server";
import plaidClient from "@/shared/lib/plaid";
import { TransactionsSyncRequest } from "plaid";

export async function syncPlaidTransactions(plaidItemDbId: string) {
  const supabase = await createClient();

  //1. Get the Plaid item from the database using the provided plaidItemDbId
  const { data: item, error: itemError } = await supabase
    .from("plaid_items")
    .select("id, user_id, access_token, plaid_cursor")
    .eq("id", plaidItemDbId)
    .single();

  if (itemError) {
    console.error("Error fetching Plaid item:", itemError);
    throw new Error("Failed to fetch Plaid item");
  }

  if (!item) {
    throw new Error("Plaid item not found");
  }

  //2. Initialize variables for syncing transactions
  const accessToken = item.access_token;
  let currentCursor = item.plaid_cursor || null;
  let hasMore = true;

  //3. Get accounts for this Plaid item
  const { data: accounts, error: accountsError } = await supabase
    .from("accounts")
    .select("id, plaid_account_id")
    .eq("plaid_item_db_id", item.id);

  if (accountsError) {
    console.error("Error fetching accounts:", accountsError);
    throw new Error("Failed to fetch accounts");
  }

  //4. Create a map of Plaid account IDs to Spendie account IDs for quick lookup
  const accountMap = new Map(
    (accounts ?? []).map((account) => [account.plaid_account_id, account.id]),
  );

  //5. Loop through paginated results until all transactions are synced
  while (hasMore) {
    const plaidRequest: TransactionsSyncRequest = {
      access_token: accessToken,
      cursor: currentCursor,
    };

    const response = await plaidClient.transactionsSync(plaidRequest);

    const { added, modified, removed, next_cursor, has_more } = response.data;

    const updates = [...added, ...modified];

    //Upsert new and modified transactions into the database
    for (const tx of updates) {
      const displayName = tx.merchant_name ?? tx.name;

      //Find the corresponding Spendie account ID for the Plaid account ID
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
        user_id: item.user_id,

        account_id: accountId, //FK -> accounts.id
      });

      if (error) {
        console.error("Error syncing Plaid transactions:", error);
      }
    }

    //Remove transactions that have been deleted in Plaid
    if (removed && removed.length > 0) {
      const removedIds = removed.map((tx) => tx.transaction_id);

      const { error } = await supabase
        .from("transactions")
        .delete()
        .in("plaid_transaction_id", removedIds);

      if (error) console.error("Error removing cancelled transactions:", error);
    }
    //Update cursor and hasMore for next iteration
    currentCursor = next_cursor;
    hasMore = has_more;
  }

  //6. Update the cursor in the database for this item
  const { error: cursorError } = await supabase
    .from("plaid_items")
    .update({ plaid_cursor: currentCursor })
    .eq("id", item.id);

  if (cursorError) {
    console.error("Error updating Plaid cursor:", cursorError);
    throw new Error("Failed to update Plaid cursor");
  }
}
