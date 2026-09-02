import { NextResponse } from "next/server";

import plaidClient from "@/shared/lib/plaid";

import { SandboxItemFireWebhookRequestWebhookCodeEnum } from "plaid";

export async function POST(request: Request) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Missing access token" },
        { status: 400 },
      );
    }

    const response = await plaidClient.sandboxItemFireWebhook({
      access_token: accessToken,
      webhook_code:
        SandboxItemFireWebhookRequestWebhookCodeEnum.SyncUpdatesAvailable,
    });

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error firing Plaid webhook:", error);

    return NextResponse.json(
      { error: "Failed to fire Plaid webhook" },
      { status: 500 },
    );
  }
}
