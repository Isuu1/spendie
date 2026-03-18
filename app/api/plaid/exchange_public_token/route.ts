import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server"; // Assuming you have a Supabase server client utility
import { CountryCode, ItemPublicTokenExchangeRequest } from "plaid";
import plaidClient from "@/shared/lib/plaid";
import { syncPlaidTransactions } from "@/features/transactions/api/syncPlaidTransactions";
import { syncPlaidAccountsForItem } from "@/features/accounts/api/syncPlaidAccountsForItem";

export async function POST(request: Request) {
  try {
    const { public_token, userId } = await request.json();

    if (!public_token || !userId) {
      return NextResponse.json(
        { error: "Missing public token or user ID" },
        { status: 400 },
      );
    }

    const plaidRequest: ItemPublicTokenExchangeRequest = {
      public_token: public_token,
    };

    //Exchange the public token for an access token and item ID
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
    const supabase = await createClient();

    const { error } = await supabase.from("plaid_items").insert([
      {
        user_id: userId,
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
      userId,
      accessToken: access_token,
      itemId: item_id,
    });
    await syncPlaidTransactions(userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error exchanging public token:", error);
    return NextResponse.json(
      { error: "Failed to exchange public token" },
      { status: 500 },
    );
  }
}
