"use server";

import { createClient } from "@/supabase/server";
import plaidClient from "@/shared/lib/plaid";

type SyncPlaidAccountsForItemParams = {
  userId: string;
  itemId: string;
};

export async function syncPlaidAccountsForItem({
  userId,
  itemId,
}: SyncPlaidAccountsForItemParams) {
  const supabase = await createClient();

  //1. Fetch access token securely from DB
  const { data: item } = await supabase
    .from("plaid_items")
    .select("access_token")
    .eq("plaid_item_id", itemId)
    .single();

  if (!item) throw new Error("Item not found");

  const accessToken = item.access_token;

  //2. Get accounts from Plaid for the specific item
  const response = await plaidClient.accountsGet({
    access_token: accessToken,
  });

  const accounts = response.data.accounts;

  //3. Format accounts for upsert into Supabase
  const formattedAccounts = accounts.map((acc) => ({
    user_id: userId,
    plaid_item_id: itemId, //Associate account with the correct item in plaid_items table
    plaid_account_id: acc.account_id,
    name: acc.name,
    type: acc.type,
    subtype: acc.subtype,
    mask: acc.mask,

    current_balance: acc.balances.current,
    available_balance: acc.balances.available,
    currency: acc.balances.iso_currency_code,

    last_synced_at: new Date(),

    // is_disconnected: false,
    // is_hidden: false,
  }));

  //4. Upsert accounts into Supabase
  const { error: insertError } = await supabase
    .from("accounts")
    .upsert(formattedAccounts, {
      onConflict: "plaid_account_id",
    });

  if (insertError) {
    console.error("Error syncing accounts:", insertError);
    throw new Error("Failed to sync accounts");
  }

  //5. Update last_synced_at for the plaid item
  const { error: updateError } = await supabase
    .from("plaid_items")
    .update({ last_synced_at: new Date() })
    .eq("plaid_item_id", itemId);

  if (updateError) {
    console.error("Error updating plaid item:", updateError);
    throw new Error("Failed to update plaid item");
  }
}
