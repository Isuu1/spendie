"use server";

import { syncPlaidInstitution } from "./syncPlaidInstitution";
import { syncPlaidTransactions } from "./syncPlaidTransactions";

import {
  acquirePlaidItemSyncLock,
  releasePlaidItemSyncLock,
} from "./plaidItemSyncLock";
import { createClient } from "@/supabase/server";

export async function syncPlaidItem(plaidItemDbId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("User not authenticated");
  }

  const { data: item, error: itemError } = await supabase
    .from("plaid_items")
    .select("id")
    .eq("id", plaidItemDbId)
    .eq("user_id", user.id)
    .single();

  if (itemError || !item) {
    throw new Error("Plaid item not found");
  }

  const lockAcquired = await acquirePlaidItemSyncLock(plaidItemDbId);

  if (!lockAcquired) {
    throw new Error("Plaid Item is already being synced");
  }

  try {
    await syncPlaidInstitution(plaidItemDbId);
    await syncPlaidTransactions(plaidItemDbId);
  } finally {
    try {
      await releasePlaidItemSyncLock(plaidItemDbId);
    } catch (error) {
      console.error("Failed to release Plaid Item sync lock:", {
        error,
        plaidItemDbId,
      });
    }
  }
}
