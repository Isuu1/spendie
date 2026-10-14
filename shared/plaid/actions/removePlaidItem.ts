"use server";

import { createClient } from "@/supabase/server";
import plaidClient from "../../lib/plaid";
import { revalidatePath } from "next/cache";

export async function removePlaidItem(plaidItemDbId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Not authenticated");
  }

  // Fetch the item belonging to the authenticated user.
  const { data: plaidItem, error: itemError } = await supabase
    .from("plaid_items")
    .select("access_token, removal_state")
    .eq("id", plaidItemDbId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (itemError || !plaidItem) {
    console.error("Error fetching Plaid Item:", itemError);
    throw new Error("Failed to fetch bank connection");
  }

  const accessToken = plaidItem.access_token;

  // If Plaid removal was already confirmed, retry database cleanup only.
  if (plaidItem.removal_state === "plaid_removed") {
    const { error: finalizeError } = await supabase.rpc(
      "finalize_plaid_item_removal",
      { p_plaid_item_db_id: plaidItemDbId },
    );

    if (finalizeError) {
      console.error("Failed to finalize bank removal:", finalizeError);
      throw new Error(
        "Bank disconnection is pending database cleanup. Please retry.",
      );
    }

    revalidatePath("/dashboard");
    revalidatePath("/accounts");

    return { success: true };
  }

  // Claim the removal operation so concurrent requests cannot both proceed.
  const { data: claimedItem, error: claimError } = await supabase
    .from("plaid_items")
    .update({ removal_state: "pending" })
    .eq("id", plaidItemDbId)
    .eq("user_id", user.id)
    .is("removal_state", null)
    .select("id")
    .maybeSingle();

  if (claimError) {
    console.error("Failed to claim bank removal:", claimError);
    throw new Error("Failed to prepare bank disconnection");
  }

  if (!claimedItem) {
    throw new Error("Bank removal is already in progress. Please retry later.");
  }

  if (!accessToken) {
    throw new Error("Plaid Item has no access token");
  }

  // Remove the bank connection from Plaid.
  try {
    await plaidClient.itemRemove({ access_token: accessToken });
  } catch (plaidError) {
    console.error(
      "Plaid removal failed or has an uncertain outcome:",
      plaidError,
    );

    // Keep removal_state = "pending".
    // A later recovery flow must establish whether Plaid removed the item.
    throw new Error(
      "Bank removal could not be confirmed. Recovery may be required.",
    );
  }

  // Record that Plaid confirmed removal.
  const { data: confirmedItem, error: confirmError } = await supabase
    .from("plaid_items")
    .update({ removal_state: "plaid_removed" })
    .eq("id", plaidItemDbId)
    .eq("user_id", user.id)
    .eq("removal_state", "pending")
    .select("id")
    .maybeSingle();

  if (confirmError || !confirmedItem) {
    console.error("Failed to record Plaid removal confirmation:", confirmError);
    throw new Error(
      "Plaid removed the bank, but database cleanup needs recovery.",
    );
  }

  // Atomically delete the item and its related database records.
  const { error: finalizeError } = await supabase.rpc(
    "finalize_plaid_item_removal",
    { p_plaid_item_db_id: plaidItemDbId },
  );

  if (finalizeError) {
    console.error("Failed to finalize bank removal:", finalizeError);
    throw new Error(
      "Plaid removed the bank, but database cleanup is pending. Please retry.",
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/accounts");

  return { success: true };
}
