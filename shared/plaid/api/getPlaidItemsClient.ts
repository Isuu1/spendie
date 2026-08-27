import { getUserClient } from "@/features/user/api/getUserClient";
import { createClient } from "@/supabase/client";

export async function getPlaidItemsClient() {
  const supabase = createClient();

  const user = await getUserClient();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("plaid_items")
    .select(
      `
      id,
      plaid_item_id,
      institution_name,
      last_synced_at,
      status
    `,
    )
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching plaid items:", error);
    throw new Error("Failed to fetch plaid items");
  }

  return data;
}
