"use server";

import { createClient } from "@/supabase/server";
import plaidClient from "../../lib/plaid";
import { revalidatePath } from "next/cache";

export async function removePlaidItem(plaidItemDbId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.error("Not authenticated: ", error);
    throw new Error("Not authenticated");
  }

  const userId = data?.user.id;

  // Fetch the access token for the given plaidItemDbId and userId from auth session
  const { data: plaidItem, error: itemError } = await supabase
    .from("plaid_items")
    .select("access_token")
    .eq("id", plaidItemDbId)
    .eq("user_id", userId)
    .single();

  if (itemError) {
    console.error("Error fetching plaid item:", itemError);
    throw new Error("Failed to fetch plaid item");
  }

  const accessToken = plaidItem?.access_token;

  // Call the Plaid API to invalidate the access token and remove the item
  try {
    await plaidClient.itemRemove({ access_token: accessToken });
  } catch (plaidError) {
    console.error("Error removing item from Plaid:", plaidError);
    throw new Error("Failed to remove item from Plaid");
  }

  // Remove the item from the Supabase database
  // Delete of accounts and transactions is handled by foreign key constraints on
  // delete cascade in the database schema
  const { error: deleteError } = await supabase
    .from("plaid_items")
    .delete()
    .eq("id", plaidItemDbId)
    .eq("user_id", userId);

  if (deleteError) {
    console.error("Error deleting plaid item from database:", deleteError);
    throw new Error("Failed to delete plaid item from database");
  }
  revalidatePath("/dashboard");
  return { success: true };
}
