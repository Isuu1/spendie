import { createClient } from "@/supabase/server";

import { syncPlaidTransactions } from "@/shared/plaid/api/syncPlaidTransactions";

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: plaidItem, error: plaidItemError } = await supabase
    .from("plaid_items")
    .select("id, plaid_item_id")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  if (plaidItemError || !plaidItem) {
    return Response.json({ error: "No Plaid Item found" }, { status: 404 });
  }

  await syncPlaidTransactions(plaidItem.id);

  return Response.json({
    success: true,
    plaidItemDbId: plaidItem.id,
    plaidItemId: plaidItem.plaid_item_id,
  });
}
