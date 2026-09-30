import { NextResponse } from "next/server";

import { createClient } from "@/supabase/server";
import { CountryCode, LinkTokenCreateRequest } from "plaid";

import plaidClient from "@/shared/lib/plaid";

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
      .select("id, access_token, status")
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

    if (!plaidItem.access_token) {
      return NextResponse.json(
        { error: "Plaid Item has no access token" },
        { status: 400 },
      );
    }

    const plaidRequest: LinkTokenCreateRequest = {
      user: {
        client_user_id: user.id,
      },
      client_name: "Spendie",
      country_codes: [CountryCode.Us],
      language: "en",
      access_token: plaidItem.access_token,
      webhook: "https://spendie-theta.vercel.app/api/webhooks/plaid",
    };

    const response = await plaidClient.linkTokenCreate(plaidRequest);

    return NextResponse.json({
      link_token: response.data.link_token,
    });
  } catch (error) {
    console.error("Error creating Plaid update link token:", error);

    return NextResponse.json(
      { error: "Failed to create Plaid update link token" },
      { status: 500 },
    );
  }
}
