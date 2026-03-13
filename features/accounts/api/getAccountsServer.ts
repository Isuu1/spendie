import { createClient } from "@/supabase/server";
import { Account } from "../types/account";

export async function getAccountsServer(): Promise<Account[]> {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return [];
  }

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", authData.user.id);

  if (error) {
    console.error("Failed to fetch accounts:", error);
    return [];
  }

  return data ?? [];
}
