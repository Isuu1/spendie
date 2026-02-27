"use server";

import { createClient } from "@/supabase/server";
import { PopulatedRecurringPayment } from "../../types/recurring-payment";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";

type MarkAsPaidResult = {
  success: boolean;
  error: string | null;
  message: string | null;
};

export async function markAsPaid(
  payment: PopulatedRecurringPayment,
): Promise<MarkAsPaidResult> {
  const supabase = await createClient();

  try {
    const paidDate = dayjs().format("YYYY-MM-DD");

    //Get user ID from supabase auth
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      return {
        success: false,
        error: "User not authenticated",
        message: "User not authenticated",
      };
    }

    const nextPaymentDate = () => {
      if (payment.repeat.toLowerCase() === "monthly") {
        return dayjs(payment.first_payment_date)
          .add(1, "month")
          .format("YYYY-MM-DD");
      } else if (payment.repeat.toLowerCase() === "weekly") {
        return dayjs(payment.first_payment_date)
          .add(1, "week")
          .format("YYYY-MM-DD");
      }
    };

    //Update next payment date in recurring_payments table
    const { error: updateError } = await supabase
      .from("recurring_payments")
      .update({
        next_payment_date: nextPaymentDate(),
      })
      .eq("id", payment.id)
      .eq("user_id", user.data.user.id);

    if (updateError) {
      console.error("Error updating next payment date:", updateError);
      return {
        success: false,
        error:
          "There was an error marking the payment as paid. Please try again.",
        message: "Failed to update next payment date",
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
