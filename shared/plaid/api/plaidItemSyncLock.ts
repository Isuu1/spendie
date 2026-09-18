import { createAdminClient } from "@/supabase/admin";

export async function acquirePlaidItemSyncLock(
  plaidItemDbId: string,
): Promise<boolean> {
  const supabase = createAdminClient();

  const { data, error } = await supabase.rpc("acquire_plaid_item_sync_lock", {
    p_plaid_item_db_id: plaidItemDbId,
  });

  if (error) {
    console.error("Error acquiring Plaid Item sync lock:", {
      error,
      plaidItemDbId,
    });

    throw new Error("Failed to acquire Plaid Item sync lock");
  }

  return data === true;
}

export async function releasePlaidItemSyncLock(
  plaidItemDbId: string,
): Promise<void> {
  const supabase = createAdminClient();

  const { error } = await supabase.rpc("release_plaid_item_sync_lock", {
    p_plaid_item_db_id: plaidItemDbId,
  });

  if (error) {
    console.error("Error releasing Plaid Item sync lock:", {
      error,
      plaidItemDbId,
    });

    throw new Error("Failed to release Plaid Item sync lock");
  }
}
