"use server";

import { createClient } from "@/supabase/server";
import moment from "moment";
import { RecurringPayment } from "../../types/recurring-payment";
import { revalidatePath } from "next/cache";

function getNextDate(currentDate: string, repeat: string) {
  const date = moment(currentDate);
  if (repeat.toLowerCase() === "weekly") date.add(1, "week");
  else if (repeat.toLowerCase() === "monthly") date.add(1, "month");
  return date.format("YYYY-MM-DD");
}

export async function markAsPaid(payment: RecurringPayment) {
  const supabase = await createClient();

  try {
    //const user = await supabase.auth.getUser();

    const paidDate = moment().format("YYYY-MM-DD");

    const nextDate = getNextDate(payment.next_payment_date, payment.repeat);
    //Get user Id form profiles
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      return {
        error: "User not authenticated",
        message: "User not authenticated",
      };
    }
    // 1️⃣ Add entry to recurring_payments_history
    const { error: historyError } = await supabase
      .from("recurring_payments_history")
      .insert({
        user_id: user.data.user.id,
        recurring_payment_id: payment.id,
        paid_date: paidDate,
        amount: payment.amount,
      });
    //.eq("user_id", user.data.user.id);
    if (historyError) {
      console.error("History insert error:", historyError);
      return { error: historyError, message: "Failed to log payment history" };
    }

    // 2️⃣ Update next_payment_date in recurring_payments
    const { error: updateError } = await supabase
      .from("recurring_payments")
      .update({ next_payment_date: nextDate })
      .eq("id", payment.id);

    if (updateError) {
      console.error("Update error:", updateError);
      return { error: updateError, message: "Failed to update payment" };
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error marking payment as paid:", error);
    return { error };
  }
}
