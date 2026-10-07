// app/api/test/match-recurring-payment/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { findMatchingRecurringPayment } from "@/features/recurring-payments/lib/actions/findMatchingRecurringPayment";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }

  // Get one transaction belonging to the current user
  const { data: transaction, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .eq("id", "2887")
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!transaction) {
    return NextResponse.json(
      { error: "No transactions found" },
      { status: 404 },
    );
  }

  const match = await findMatchingRecurringPayment(transaction);

  return NextResponse.json({
    transaction,
    match,
  });
}
