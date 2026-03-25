"use server";

import { createClient } from "@/supabase/server";

export async function renameAccount({
  accountId,
  userName,
}: {
  accountId: string;
  userName: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("accounts")
    .update({ user_account_name: userName })
    .eq("id", accountId);

  if (error) {
    throw new Error("Failed to rename account");
  }
}
