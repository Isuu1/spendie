import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server"; // Assuming you have a Supabase server client utility
import { LinkTokenCreateRequest, Products, CountryCode } from "plaid";
import plaidClient from "@/shared/lib/plaid";

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: user, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const plaidRequest: LinkTokenCreateRequest = {
      user: {
        // This should correspond to a unique id for the current user.
        // We use the Supabase user ID.
        client_user_id: user.user.id,
      },
      client_name: "Spendie", // Replace with your app name
      products: [Products.Transactions], // Specify the Plaid products you need
      country_codes: [CountryCode.Us], // Specify the countries you support
      language: "en",
      // redirect_uri: process.env.PLAID_REDIRECT_URI, // Required for OAuth institutions
      // webhook: process.env.PLAID_WEBHOOK_URI, // Recommended for receiving updates
    };

    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);

    return NextResponse.json(createTokenResponse.data);
  } catch (error) {
    console.error("Error creating link token:", error);
    return NextResponse.json(
      { error: "Failed to create link token" },
      { status: 500 }
    );
  }
}
