import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server"; // Assuming you have a Supabase server client utility
import { ItemPublicTokenExchangeRequest } from "plaid";
import plaidClient from "@/shared/lib/plaid";

export async function POST(request: Request) {
  try {
    const { public_token, userId } = await request.json();

    if (!public_token || !userId) {
      return NextResponse.json(
        { error: "Missing public token or user ID" },
        { status: 400 }
      );
    }

    const plaidRequest: ItemPublicTokenExchangeRequest = {
      public_token: public_token,
    };

    const plaidResponse =
      await plaidClient.itemPublicTokenExchange(plaidRequest);
    const { access_token, item_id } = plaidResponse.data;

    // Store the access_token and item_id in your Supabase database
    const supabase = await createClient(); // Get your Supabase server client instance

    const { error } = await supabase.from("plaid_items").insert([
      {
        user_id: userId,
        plaid_item_id: item_id,
        access_token: access_token,
      },
    ]);

    if (error) {
      console.error("Error saving Plaid item to Supabase:", error);
      return NextResponse.json(
        { error: "Failed to save Plaid item" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error exchanging public token:", error);
    return NextResponse.json(
      { error: "Failed to exchange public token" },
      { status: 500 }
    );
  }
}
