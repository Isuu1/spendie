import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
import { createClient } from "@/supabase/client";

export async function getRecurringPaymentsClient(): Promise<
  RecurringPayment[]
> {
  const supabase = createClient();

  const { data: authUser } = await supabase.auth.getUser();

  if (!authUser?.user) {
    throw new Error("Authentication error: User not found");
  }

  const { data, error } = await supabase
    .from("recurring_payments")
    .select("*")
    .eq("user_id", authUser.user.id)
    .order("next_payment_date", { ascending: true });

  if (error) {
    throw new Error("Could not load recurring payments: " + error.message);
  }
  return data ?? [];
}
