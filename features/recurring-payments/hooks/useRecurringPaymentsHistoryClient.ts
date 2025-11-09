"use client";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { RecurringPaymentHistory } from "../types/recurring-payment";

export function useRecurringPaymentsHistoryClient() {
  const supabase = createClient();
  return useQuery({
    queryKey: ["recurringPayments"],
    queryFn: async () => {
      const { data: authUser, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authUser?.user) {
        console.error("Error fetching user:", authError);
        return;
      }

      const { data, error: recurringPaymentsHistoryError } = await supabase
        .from("recurring_payments_history")
        .select("*")
        .eq("user_id", authUser?.user?.id)
        .order("paid_date", { ascending: true });

      if (recurringPaymentsHistoryError) {
        console.error(
          "Error fetching recurring payments:",
          recurringPaymentsHistoryError
        );
        return;
      }

      return data as RecurringPaymentHistory[];
    },
  });
}
