import { createClient } from "@/supabase/server";
import { AccountsGetRequest } from "plaid";
import plaidClient from "@/shared/lib/plaid";
import { Account } from "@/features/accounts/types/account";

type AccountsResult = {
  accounts: Account[];
  error?: string | null;
};

export async function getAccountsServer(): Promise<AccountsResult> {
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

    if (fetchError) {
      console.error(
        "Server-side getAccounts Function: Supabase fetch error for plaid_items:",
        fetchError
      );
      return {
        accounts: [],
        error: "Database error: Failed to fetch Plaid items",
      };
    }

    if (!plaidItems || plaidItems.length === 0) {
      return {
        accounts: [],
        error: "Database error: No linked accounts found",
      };
    }

    const accessToken = plaidItems[0].access_token;

    const plaidRequest: AccountsGetRequest = {
      access_token: accessToken,
      options: {},
    };

    const response = await plaidClient.accountsGet(plaidRequest);

    if (!response) {
      console.error("Error fetching accounts from Plaid");
      return { accounts: [], error: "Failed to fetch accounts from Plaid" };
    }

    return {
      accounts: response.data.accounts,
    };
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw new Error("Failed to fetch accounts");
  }
}
