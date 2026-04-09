"use server";

import { createClient } from "@/supabase/server";

export async function disconnectAccount(accountId: string) {
  const supabase = await createClient();

  //Find the account to get its current disconnected status
  const { data: account, error: fetchError } = await supabase
    .from("accounts")
    .select("is_disconnected")
    .eq("id", accountId)
    .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (!account) {
    throw new Error("Account not found");
  }

  //Toggle the disconnected status
  const newDisconnectedStatus = !account.is_disconnected;

  //Update the account with the new disconnected status
  const { error } = await supabase
    .from("accounts")
    .update({ is_disconnected: newDisconnectedStatus })
    .eq("id", accountId);

  if (error) {
    throw new Error(error.message);
  }
}
