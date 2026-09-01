import { NextResponse } from "next/server";

import { verifyPlaidWebhook } from "@/shared/plaid/api/verifyPlaidWebhook";

export async function POST(request: Request) {
  try {
    const body = await request.text();

    const verificationHeader = request.headers.get("Plaid-Verification");

    if (!verificationHeader) {
      return NextResponse.json(
        { error: "Missing Plaid verification header" },
        { status: 401 },
      );
    }

    const isValid = await verifyPlaidWebhook(body, verificationHeader);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid Plaid webhook" },
        { status: 401 },
      );
    }

    const webhook = JSON.parse(body);

    console.log("Verified Plaid webhook:", webhook);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling Plaid webhook:", error);

    return NextResponse.json(
      { error: "Failed to handle Plaid webhook" },
      { status: 500 },
    );
  }
}
