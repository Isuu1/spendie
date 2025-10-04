import { RecurringPayment } from "@/shared/types/recurring-payment";
import { createClient } from "@/supabase/server";

type RecurringPaymentsResult = {
  recurringPayments: RecurringPayment[];
  error: string | null;
};

export async function getRecurringPayments(): Promise<RecurringPaymentsResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { recurringPayments: [], error: error.message };
  }

  const { data: userRecurringPayments, error: userRecurringPaymentsError } =
    await supabase
      .from("recurring_payments")
      .select("*")
      .eq("user_id", data.user.id)
      .order("date", { ascending: true });

  if (userRecurringPaymentsError) {
    return {
      recurringPayments: [],
      error: "Could not load recurring payments",
    };
  }
  return { recurringPayments: userRecurringPayments || [], error: null };
}
