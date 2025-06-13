import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { AccountsGetRequest } from "plaid";
import plaidClient from "@/shared/lib/plaid";

export async function POST() {
  try {
    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error("Error fetching user:", authError);
      throw new Error("Failed to fetch user data");
    }

    // Fetch the user's access token from the database
    const { data: plaidItems, error: fetchError } = await supabase
      .from("plaid_items")
      .select("access_token")
      .eq("user_id", authData.user.id);

    if (fetchError) {
      console.error("Error fetching Plaid items:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch Plaid items" },
        { status: 500 }
      );
    }

    if (!plaidItems || plaidItems.length === 0) {
      return NextResponse.json(
        { error: "No linked Plaid items found for this user" },
        { status: 404 }
      );
    }

    const plaidRequest: AccountsGetRequest = {
      access_token: plaidItems[0].access_token,
      options: {
        // Optional: specify options like count, offset, etc.
      },
    };
    const response = await plaidClient.accountsGet(plaidRequest);

    return NextResponse.json(response.data.accounts);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
