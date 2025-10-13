"use server";

import { createClient } from "@/supabase/server";
import moment from "moment";
import { PopulatedRecurringPayment } from "../../types/recurring-payment";
import { revalidatePath } from "next/cache";

type MarkAsPaidResult = {
  success: boolean;
  error: string | null;
  message: string | null;
};

export async function markAsPaid(
  payment: PopulatedRecurringPayment
): Promise<MarkAsPaidResult> {
  const supabase = await createClient();

  try {
    const paidDate = moment().format("YYYY-MM-DD");

    //Get user ID from supabase auth
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      return {
        success: false,
        error: "User not authenticated",
        message: "User not authenticated",
      };
    }
    //Add entry to recurring_payments_history
    const { error: historyError } = await supabase
      .from("recurring_payments_history")
      .insert({
        user_id: user.data.user.id,
        payment_id: payment.id,
        name: payment.name,
        payment_date: payment.next_payment_date,
        paid_date: paidDate,
        amount: payment.amount,
      });

    if (historyError) {
      console.error("History insert error:", historyError);
      return {
        success: false,
        error:
          "There was an error marking the payment as paid. Please try again.",
        message: "Failed to log payment history",
      };
    }

    //Refresh data in dashboard by revalidating the path
    revalidatePath("/dashboard");

    return { success: true, error: null, message: "Payment marked as paid" };
  } catch (error) {
    console.error("Error marking payment as paid:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
      message: "An unexpected error occurred",
    };
  }
}
