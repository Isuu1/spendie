"use server";

import { createClient } from "@/supabase/server";
import moment from "moment";
import { RecurringPayment } from "../../types/recurring-payment";
import { revalidatePath } from "next/cache";
import { getNextPaymentDate } from "../utils/getNextPaymentDate";

type MarkAsPaidResult = {
  success: boolean;
  error: string | null;
  message: string | null;
};

export async function markAsPaid(
  payment: RecurringPayment
): Promise<MarkAsPaidResult> {
  const supabase = await createClient();

  try {
    const paidDate = moment().format("YYYY-MM-DD");

    const nextDate = getNextPaymentDate(
      payment.next_payment_date,
      payment.repeat
    );

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
        error: "There was an error logging the payment history",
        message: "Failed to log payment history",
      };
    }

    //Update next_payment_date in recurring_payments
    const { error: updateError } = await supabase
      .from("recurring_payments")
      .update({ next_payment_date: nextDate })
      .eq("id", payment.id);

    if (updateError) {
      console.error("Update error:", updateError);
      return {
        success: false,
        error: "There was an error updating the payment",
        message: "Failed to update payment",
      };
    }
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
