"use server";

import { createClient } from "@/supabase/server";

export async function hideAccount(accountId: string) {
  const supabase = await createClient();

  //Find the account to get its current hidden status
  const { data: account, error: fetchError } = await supabase
    .from("accounts")
    .select("is_hidden")
    .eq("id", accountId)
    .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (!account) {
    throw new Error("Account not found");
  }

  //Toggle the hidden status
  const newHiddenStatus = !account.is_hidden;

  //Update the account with the new hidden status
  const { error } = await supabase
    .from("accounts")
    .update({ is_hidden: newHiddenStatus })
    .eq("id", accountId);

  if (error) {
    throw new Error(error.message);
  }
}
