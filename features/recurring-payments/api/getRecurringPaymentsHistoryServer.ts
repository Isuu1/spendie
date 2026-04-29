import { createClient } from "@/supabase/server";
import { RecurringPaymentHistory } from "../types/recurringPayment";

export async function getRecurringPaymentsHistoryServer(): Promise<
  RecurringPaymentHistory[]
> {
  const supabase = await createClient();

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
