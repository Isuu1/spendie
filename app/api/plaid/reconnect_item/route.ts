import { NextResponse } from "next/server";

import { createClient } from "@/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const { plaidItemDbId } = await request.json();

    if (!plaidItemDbId) {
      return NextResponse.json(
        { error: "Plaid Item ID is required" },
        { status: 400 },
      );
    }

    const { data: plaidItem, error: plaidItemError } = await supabase
      .from("plaid_items")
      .select("id, status")
      .eq("id", plaidItemDbId)
      .eq("user_id", user.id)
      .single();

    if (plaidItemError || !plaidItem) {
      return NextResponse.json(
        { error: "Plaid Item not found" },
        { status: 404 },
      );
    }

    if (plaidItem.status !== "needs_reauth") {
      return NextResponse.json(
        { error: "Plaid Item does not require reauthentication" },
        { status: 400 },
      );
    }

    const { error: updateError } = await supabase
      .from("plaid_items")
      .update({ status: "connected" })
      .eq("id", plaidItemDbId)
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Failed to reconnect Plaid Item:", updateError);

      return NextResponse.json(
        { error: "Failed to reconnect Plaid Item" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reconnecting Plaid Item:", error);

    return NextResponse.json(
      { error: "Failed to reconnect Plaid Item" },
      { status: 500 },
    );
  }
}
