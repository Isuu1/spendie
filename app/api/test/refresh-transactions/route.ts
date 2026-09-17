import { NextResponse } from "next/server";

import { createClient } from "@/supabase/server";
import plaidClient from "@/shared/lib/plaid";

export async function POST() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: plaidItem, error: plaidItemError } = await supabase
      .from("plaid_items")
      .select("access_token")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    if (plaidItemError || !plaidItem) {
      return NextResponse.json(
        { error: "No Plaid Item found" },
        { status: 404 },
      );
    }

    const response = await plaidClient.transactionsRefresh({
      access_token: plaidItem.access_token,
    });

    console.log("Transactions refresh response:", response.data);

    return NextResponse.json({
      success: true,
      requestId: response.data.request_id,
    });
  } catch (error) {
    console.error("Error refreshing Sandbox transactions:", error);

    return NextResponse.json(
      { error: "Failed to refresh transactions" },
      { status: 500 },
    );
  }
}
