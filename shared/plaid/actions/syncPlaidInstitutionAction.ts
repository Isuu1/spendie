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

  if (!user) {
    throw new Error("User not authenticated");
  }

  //Use sync function to sync accounts for the specific item
  return await syncPlaidInstitution({
    userId: user.id,
    plaidItemDbId: plaidItemDbId,
  });
}
