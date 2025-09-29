import { createClient } from "@/supabase/server";
import { AccountsGetRequest } from "plaid";
import plaidClient from "@/shared/lib/plaid";
import { Account } from "@/shared/types/account";

export async function getAccountsServer() {
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

    const plaidRequest: AccountsGetRequest = {
      access_token: accessToken,
      options: {},
    };

    const response = await plaidClient.accountsGet(plaidRequest);

    return response.data.accounts as Account[];
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
}
