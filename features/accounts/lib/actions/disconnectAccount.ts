"use server";

import { createClient } from "@/supabase/server";

export async function disconnectAccount(accountId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("accounts")
    .update({ is_disconnected: true })
    .eq("id", accountId);

  if (error) {
    throw new Error(error.message);
  }
}
