import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { CountryCode, ItemPublicTokenExchangeRequest } from "plaid";
import plaidClient from "@/shared/lib/plaid";
import { syncPlaidTransactions } from "@/features/transactions/api/syncPlaidTransactions";
import { syncPlaidAccountsForItem } from "@/features/accounts/api/syncPlaidAccountsForItem";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    //Get the public token from the request body
    const { public_token } = await request.json();

    if (!public_token) {
      return NextResponse.json(
        { error: "Missing public token" },
        { status: 400 },
      );
    }

    //Get the user ID from the Supabase auth session
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    //Exchange the public token for an access token and item ID
    const plaidRequest: ItemPublicTokenExchangeRequest = {
      public_token: public_token,
    };

    const plaidResponse =
      await plaidClient.itemPublicTokenExchange(plaidRequest);

    const { access_token, item_id } = plaidResponse.data;

    //Get institution_id (bank name) for the item to store in the database
    const itemResponse = await plaidClient.itemGet({
      access_token,
    });

    const institutionId = itemResponse.data.item.institution_id;

    let institutionName = "Unknown";

    let institutionLogo = null;

    if (institutionId) {
      const institutionResponse = await plaidClient.institutionsGetById({
        institution_id: institutionId,
        country_codes: [CountryCode.Gb],
      });

      institutionName = institutionResponse.data.institution.name;

      institutionLogo = institutionResponse.data.institution.logo || null;
    }

    //Store the access_token and item_id in your Supabase database

    const { error } = await supabase.from("plaid_items").insert([
      {
        user_id: user.id,
        plaid_item_id: item_id,
        access_token: access_token,
        last_synced_at: new Date(),
        institution_name: institutionName,
        institution_logo: institutionLogo,
        status: "connected",
      },
    ]);

    if (error) {
      console.error("Error saving Plaid item to Supabase:", error);
      return NextResponse.json(
        { error: "Failed to save Plaid item" },
        { status: 500 },
      );
    }

    //Accounts will be synced after user connects their bank
    //Sync accounts immediately after storing the access token
    //Sync only accounts for the newly connected item to avoid unnecessary API calls and potential rate limits
    await syncPlaidAccountsForItem({
      userId: user.id,
      itemId: item_id,
    });
    await syncPlaidTransactions(user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error exchanging public token:", error);
    return NextResponse.json(
      { error: "Failed to exchange public token" },
      { status: 500 },
    );
  }
}
