"use server";

import plaidClient from "@/shared/lib/plaid";
import { TransactionsSyncRequest } from "plaid";
import { createAdminClient } from "@/supabase/admin";
import { markRecurringPaymentAutomatically } from "@/features/recurring-payments/lib/actions/markRecurringPaymentAutomatically";
import { findMatchingRecurringPayment } from "@/features/recurring-payments/lib/actions/findMatchingRecurringPayment";

export async function syncPlaidTransactions(plaidItemDbId: string) {
  //Use admin client to access the database without user context
  //This is due this being called from a Plaid webhook, not a user request
  const supabase = createAdminClient();

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
  let currentCursor = item.plaid_cursor;
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

  console.log("Plaid sync starting:", {
    plaidItemDbId,
    storedCursor: currentCursor,
  });

  //5. Loop through paginated results until all transactions are synced
  while (hasMore) {
    const plaidRequest: TransactionsSyncRequest = {
      access_token: accessToken,
      //Make cursor conditional to handle the first sync where there is no cursor yet
      ...(currentCursor ? { cursor: currentCursor } : {}),
    };

    const response = await plaidClient.transactionsSync(plaidRequest);

    const { added, modified, removed, next_cursor, has_more } = response.data;

    console.log("Plaid sync response:", {
      addedCount: added.length,
      modifiedCount: modified.length,
      removedCount: removed.length,
      nextCursor: next_cursor,
      hasMore: has_more,
    });

    //Combine added and modified transactions for upsert
    const updates = [...added, ...modified];

    console.log("updates", updates);

    //Upsert new and modified transactions into the database
    for (const tx of updates) {
      const displayName = tx.merchant_name ?? tx.name;

      //Find the corresponding Spendie account ID for the Plaid account ID
      const accountId = accountMap.get(tx.account_id);

      console.log("Syncing Plaid transaction:", {
        plaidTransactionId: tx.transaction_id,
        plaidAccountId: tx.account_id,
        spendieAccountId: accountId,
        amount: tx.amount,
        name: displayName,
        date: tx.date,
      });

      //If no corresponding Spendie account is found, log an error and skip this transaction
      if (!accountId) {
        console.error(
          `Could not find Spendie account for Plaid account ${tx.account_id}`,
        );
        continue;
      }

      // const { error } = await supabase.from("transactions").upsert(
      //   {
      //     plaid_transaction_id: tx.transaction_id,
      //     amount: tx.amount,
      //     name: displayName,
      //     original_name: tx.name,
      //     merchant_name: tx.merchant_name,
      //     date: tx.date,
      //     pending: tx.pending,
      //     category: tx.personal_finance_category?.primary,
      //     iso_currency_code: tx.iso_currency_code,
      //     user_id: item.user_id,

      //     account_id: accountId, //FK -> accounts.id
      //   },
      //   {
      //     //If a transaction with the same plaid_transaction_id already exists, update it instead of inserting a new row
      //     onConflict: "plaid_transaction_id",
      //   },
      // );

      // if (error) {
      //   console.error("Error syncing Plaid transaction:", {
      //     error,
      //     transactionId: tx.transaction_id,
      //     plaidAccountId: tx.account_id,
      //     spendieAccountId: accountId,
      //   });

      const { data: savedTransaction, error } = await supabase
        .from("transactions")
        .upsert(
          {
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
            account_id: accountId,
          },
          {
            //If a transaction with the same plaid_transaction_id already exists, update it instead of inserting a new row
            onConflict: "plaid_transaction_id",
          },
        )
        .select()
        .single();

      if (error) {
        console.error("Error syncing Plaid transaction:", {
          error,
          transactionId: tx.transaction_id,
          plaidAccountId: tx.account_id,
          spendieAccountId: accountId,
        });

        throw new Error("Failed to sync Plaid transaction");
      }

      console.log("savedTransaction", savedTransaction);

      // Only newly added transactions should trigger
      // automatic recurring payment matching.
      const isNewTransaction = added.some(
        (addedTransaction) =>
          addedTransaction.transaction_id === tx.transaction_id,
      );

      console.log("isNewTransaction", isNewTransaction);

      if (isNewTransaction) {
        const matchingPayment =
          await findMatchingRecurringPayment(savedTransaction);

        console.log("matchingPayment", matchingPayment);

        if (matchingPayment) {
          console.log("Found matching recurring payment for transaction:", {
            transactionId: savedTransaction.id,
            recurringPaymentId: matchingPayment.id,
          });
          await markRecurringPaymentAutomatically(
            matchingPayment,
            savedTransaction,
          );
        }
      }
    }
    console.log("Successfully synced transactions for Plaid item");

    //Remove transactions that have been deleted in Plaid
    if (removed && removed.length > 0) {
      const removedIds = removed.map((tx) => tx.transaction_id);

      const { error } = await supabase
        .from("transactions")
        .delete()
        .in("plaid_transaction_id", removedIds);

      if (error) {
        console.error("Error removing transactions:", {
          error,
          transactionIds: removedIds,
        });

        throw new Error("Failed to remove Plaid transactions");
      }
    }
    //Update cursor and hasMore for next iteration
    currentCursor = next_cursor;
    hasMore = has_more;
  }

  console.log("Updating Plaid cursor:", {
    previousCursor: item.plaid_cursor,
    newCursor: currentCursor,
  });

  //6. Update the cursor in the database for this item
  const { error: cursorError } = await supabase
    .from("plaid_items")
    .update({ plaid_cursor: currentCursor, last_synced_at: new Date() })
    .eq("id", item.id);

  if (cursorError) {
    console.error("Error updating Plaid cursor:", cursorError);
    throw new Error("Failed to update Plaid cursor");
  }
}
