import { createClient } from "@/supabase/client";
import { RecurringPaymentHistory } from "../types/recurring-payment";

export async function getRecurringPaymentsHistoryClient(): Promise<
  RecurringPaymentHistory[]
> {
  const supabase = createClient();

  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    throw new Error("Authentication error: User not found");
  }

  const { data: paymentsHistory, error: paymentsHistoryError } = await supabase
    .from("recurring_payments_history")
    .select("*")
    .eq("user_id", authData.user.id)
    .order("paid_date", { ascending: true });

  if (paymentsHistoryError) {
    throw new Error("Could not load recurring payments history");
  }
  return paymentsHistory;
}
