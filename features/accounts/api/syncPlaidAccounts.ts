import { createClient } from "@/supabase/server";
import plaidClient from "@/shared/lib/plaid";

export async function syncPlaidAccounts(userId: string) {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("plaid_items")
    .select("access_token, plaid_item_id")
    .eq("user_id", userId);

  if (!items || items.length === 0) return;

  for (const item of items) {
    if (!item.access_token) continue;

    const response = await plaidClient.accountsGet({
      access_token: item.access_token,
    });

    const accounts = response.data.accounts;

    const formatted = accounts.map((acc) => ({
      user_id: userId,
      plaid_item_id: item.plaid_item_id, // 🔥 IMPORTANT
      plaid_account_id: acc.account_id,
      name: acc.name,
      type: acc.type,
      subtype: acc.subtype,
      mask: acc.mask,
      current_balance: acc.balances.current,
      available_balance: acc.balances.available,
      currency: acc.balances.iso_currency_code,
      last_synced_at: new Date(),
    }));

    const { error } = await supabase.from("accounts").upsert(formatted, {
      onConflict: "plaid_account_id",
    });

    if (error) {
      console.error("Error syncing Plaid accounts:", error);
    }
  }
}
