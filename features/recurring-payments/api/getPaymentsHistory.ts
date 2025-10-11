import { RecurringPaymentHistory } from "@/features/recurring-payments/types/recurring-payment";
import { createClient } from "@/supabase/server";

type RecurringPaymentsResult = {
  paymentsHistory: RecurringPaymentHistory[];
  error: string | null;
};

export async function getPaymentsHistory(): Promise<RecurringPaymentsResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { paymentsHistory: [], error: error.message };
  }

  const { data: paymentsHistory, error: paymentsHistoryError } = await supabase
    .from("recurring_payments_history")
    .select("*")
    .eq("user_id", data.user.id)
    .order("paid_date", { ascending: true });

  if (paymentsHistoryError) {
    console.log("paymentsHistoryError", paymentsHistoryError);
    return {
      paymentsHistory: [],
      error: `Could not load recurring payments history`,
    };
  }
  return { paymentsHistory: paymentsHistory || [], error: null };
}
