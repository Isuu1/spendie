import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Plaid webhook received:", body);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling Plaid webhook:", error);

    return NextResponse.json(
      { error: "Failed to handle Plaid webhook" },
      { status: 500 },
    );
  }
}
