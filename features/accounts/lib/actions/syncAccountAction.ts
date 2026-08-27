"use server";

import { syncPlaidAccountsForItem } from "../../api/syncPlaidAccountsForItem";
import { createClient } from "@/supabase/server";

export async function syncAccountAction(plaidItemDbId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("User not authenticated");
  }

  if (!user) {
    throw new Error("User not authenticated");
  }

  //Use sync function to sync accounts for the specific item
  return await syncPlaidAccountsForItem({
    userId: user.id,
    plaidItemDbId: plaidItemDbId,
  });
}
