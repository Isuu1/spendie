"use client";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { RecurringPayment } from "../types/recurring-payment";

export function useRecurringPaymentsClient() {
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

      const { data, error: recurringPaymentsError } = await supabase
        .from("recurring_payments")
        .select("*")
        .eq("user_id", authUser?.user?.id)
        .order("first_payment_date", { ascending: true });

      if (recurringPaymentsError) {
        console.error(
          "Error fetching recurring payments:",
          recurringPaymentsError
        );
        return;
      }

      return data as RecurringPayment[];
    },
  });
}
