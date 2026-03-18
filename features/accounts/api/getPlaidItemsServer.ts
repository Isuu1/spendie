import { getUserServer } from "@/features/user/api/getUserServer";
import { createClient } from "@/supabase/server";

export async function getPlaidItemsServer() {
  const supabase = await createClient();

  const user = await getUserServer();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("plaid_items")
    .select("*")
    .eq("user_id", user.id)
    .neq("status", "disconnected"); //Exclude items with status "disconnected"

  if (error) {
    console.error("Error fetching plaid items:", error);
    throw new Error("Failed to fetch plaid items");
  }

  return data;
}
