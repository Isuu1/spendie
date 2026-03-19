"use server";

import { getUserServer } from "@/features/user/api/getUserServer";
import { syncPlaidAccountsForItem } from "../../api/syncPlaidAccountsForItem";
import { createClient } from "@/supabase/server";

export async function syncAccountAction(itemId: string) {
  const supabase = await createClient();

  const user = await getUserServer();

  if (!user) {
    throw new Error("User not authenticated");
  }

  //Get the access token for the specific item from the plaid_items table
  const { data: plaidItems, error } = await supabase
    .from("plaid_items")
    .select("access_token, user_id")
    .eq("user_id", user.id)
    .eq("plaid_item_id", itemId)
    .single();

  if (error || !plaidItems) {
    console.error("Error fetching plaid item:", error);
    throw new Error("Failed to fetch plaid item");
  }

  if (plaidItems.user_id !== user.id) {
    throw new Error("Unauthorized");
  }

  if (!plaidItems.access_token) {
    throw new Error("No access token");
  }

  //Use sync function to sync accounts for the specific item
  return await syncPlaidAccountsForItem({
    userId: user.id,
    accessToken: plaidItems.access_token,
    itemId: itemId,
  });
}
