import { getTransactionsServer } from "@/features/transactions/api/getTransactionsServer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transactions = await getTransactionsServer();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 200 });
  }
}
