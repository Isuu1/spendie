"use server";

import { syncPlaidInstitution } from "../api/syncPlaidInstitution";
import { createClient } from "@/supabase/server";

export async function syncPlaidInstitutionAction(plaidItemDbId: string) {
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
    .select("user_id")
    .eq("id", plaidItemDbId)
    .eq("user_id", user.id)
    .single();

  if (itemError || !item) {
    throw new Error("Plaid item not found");
  }

  //Use sync function to sync accounts for the specific item
  return await syncPlaidInstitution(plaidItemDbId);
}
