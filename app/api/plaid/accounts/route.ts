import { getAccountsServer } from "@/features/accounts/api/getAccountsServer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accounts = await getAccountsServer();
    return NextResponse.json(accounts);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 200 });
  }
}
