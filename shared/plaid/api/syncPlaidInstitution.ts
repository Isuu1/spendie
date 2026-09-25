"use server";

import plaidClient from "@/shared/lib/plaid";
import { createAdminClient } from "@/supabase/admin";

export async function syncPlaidInstitution(plaidItemDbId: string) {
  const supabase = createAdminClient();

  //1. Fetch access token and item ID securely from DB
  const { data: item, error: itemError } = await supabase
    .from("plaid_items")
    .select("user_id, access_token, plaid_item_id")
    .eq("id", plaidItemDbId)
    .single();

  if (itemError) {
    console.error("Error fetching Plaid item:", itemError);
    throw new Error("Error fetching Plaid item");
  }

  if (!item) throw new Error("Plaid item not found");

  const accessToken = item.access_token;

  //2. Get accounts from Plaid for the specific item
  const response = await plaidClient.accountsGet({
    access_token: accessToken,
  });

  const accounts = response.data.accounts;

  //3. Check if accounts already exist in the database
  const { data: existingAccounts, error: existingAccountsError } =
    await supabase
      .from("accounts")
      .select("id, plaid_account_id")
      .eq("plaid_item_db_id", plaidItemDbId);

  if (existingAccountsError) {
    console.error("Error fetching existing accounts:", existingAccountsError);
    throw new Error("Failed to fetch existing accounts");
  }

  //4. Format accounts for upsert into Supabase
  const formattedAccounts = accounts.map((acc) => ({
    user_id: item.user_id, //Associate account with the correct user in users table
    plaid_item_id: item.plaid_item_id, //Associate account with the correct item in plaid_items table
    plaid_account_id: acc.account_id,
    name: acc.name,
    type: acc.type,
    subtype: acc.subtype,
    mask: acc.mask,

    plaid_item_db_id: plaidItemDbId, //Associate with the plaid_items.id for foreign key relationship

    current_balance: acc.balances.current,
    available_balance: acc.balances.available,
    currency: acc.balances.iso_currency_code,

    last_synced_at: new Date(),

    status: "active",
  }));

  //5. Upsert accounts into Supabase
  const { error: insertError } = await supabase
    .from("accounts")
    .upsert(formattedAccounts, {
      onConflict: "plaid_account_id",
    });

  if (insertError) {
    console.error("Error syncing accounts:", insertError);
    throw new Error("Failed to sync accounts");
  }

  //6. Create a set of plaid account IDs for quick lookup
  const plaidAccountIds = new Set(
    accounts.map((account) => account.account_id),
  );

  //7. Find accounts that are not in the set of plaid account IDs (i.e., accounts that are no longer active)
  const inactiveAccountIds = (existingAccounts ?? [])
    .filter((account) => !plaidAccountIds.has(account.plaid_account_id))
    .map((account) => account.id);

  if (inactiveAccountIds.length > 0) {
    const { error: inactiveError } = await supabase
      .from("accounts")
      .update({ status: "inactive" })
      .in("id", inactiveAccountIds);

    if (inactiveError) {
      console.error("Error marking accounts inactive:", inactiveError);
      throw new Error("Failed to update inactive accounts");
    }
  }

  //8. Update last_synced_at for the plaid item
  const { error: updateError } = await supabase
    .from("plaid_items")
    .update({ last_synced_at: new Date() })
    .eq("id", plaidItemDbId);

  if (updateError) {
    console.error("Error updating plaid item:", updateError);
    throw new Error("Failed to update plaid item");
  }
}
