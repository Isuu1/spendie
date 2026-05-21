"use server";

import { createClient } from "@/supabase/server";
import { RecurringPayment } from "../../types/recurringPayment";
import dayjs from "dayjs";

type MarkAsPaidResult = {
  success: boolean;
};

export async function markAsPaid(
  payment: RecurringPayment,
): Promise<MarkAsPaidResult> {
  const supabase = await createClient();

  const paidDate = dayjs();
  const paymentDate = dayjs(payment.next_payment_date);
  const daysDiff = paidDate.diff(paymentDate, "day");

  const status =
    paidDate.isBefore(paymentDate) || paidDate.isSame(paymentDate, "day")
      ? "On time"
      : `Late by ${daysDiff} ${daysDiff === 1 ? "day" : "days"}`;

  //Get user ID from supabase auth
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    throw new Error("User not authenticated");
  }

  const nextPaymentDate = () => {
    const current = dayjs(payment.next_payment_date);

    if (payment.repeat.toLowerCase() === "monthly") {
      return current.add(1, "month").format("YYYY-MM-DD");
    }

    if (payment.repeat.toLowerCase() === "weekly") {
      return current.add(1, "week").format("YYYY-MM-DD");
    }

    return current.format("YYYY-MM-DD");
  };

  console.log("Marking payment as paid:", {
    paymentId: payment.id,
    userId: user.data.user.id,
    paidDate: paidDate.format("YYYY-MM-DD"),
    nextPaymentDate: nextPaymentDate(),
    status,
  });

  //Update next payment date in recurring_payments table
  const { error: updateError } = await supabase
    .from("recurring_payments")
    .update({
      next_payment_date: dayjs(nextPaymentDate()),
    })
    .eq("id", payment.id)
    .eq("user_id", user.data.user.id);

  if (updateError) {
    throw new Error(
      "There was an error marking the payment as paid. Please try again." +
        updateError.message,
    );
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
      type: payment.type,
      status: status,
    });

  if (historyError) {
    throw new Error(
      "There was an error marking the payment as paid. Please try again." +
        historyError.message,
    );
  }

  return { success: true };
}
