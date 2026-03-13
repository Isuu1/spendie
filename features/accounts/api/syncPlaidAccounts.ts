import { createClient } from "@/supabase/server";
import plaidClient from "@/shared/lib/plaid";

export async function syncPlaidAccounts(userId: string) {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("plaid_items")
    .select("access_token")
    .eq("user_id", userId);

  if (!items || items.length === 0) return;

  const accessToken = items[0].access_token;

  const response = await plaidClient.accountsGet({
    access_token: accessToken,
  });

  const accounts = response.data.accounts;

  const formatted = accounts.map((acc) => ({
    user_id: userId,
    plaid_account_id: acc.account_id,
    last_synced_at: new Date(),
    name: acc.name,
    type: acc.type,
    subtype: acc.subtype,
    mask: acc.mask,
    current_balance: acc.balances.current,
    available_balance: acc.balances.available,
    currency: acc.balances.iso_currency_code,
  }));

  const { error } = await supabase.from("accounts").upsert(formatted, {
    onConflict: "plaid_account_id",
  });

  if (error) {
    console.error("Error syncing Plaid accounts:", error);
  }
}
