import { createClient } from "@/supabase/server";
import dayjs from "dayjs";
import { RecurringPayment } from "../../types/recurringPayment";

type MarkAsPaidResult = {
  success: boolean;
};

export async function markRecurringPaymentAsPaid(
  payment: RecurringPayment,
  userId: string,
): Promise<MarkAsPaidResult> {
  const supabase = await createClient();

  const paidDate = dayjs();
  const paymentDate = dayjs(payment.next_payment_date);
  const daysDiff = paidDate.diff(paymentDate, "day");

  const status =
    paidDate.isBefore(paymentDate) || paidDate.isSame(paymentDate, "day")
      ? "On time"
      : `Late by ${daysDiff} ${daysDiff === 1 ? "day" : "days"}`;

  const currentPaymentDate = dayjs(payment.next_payment_date);

  const nextPaymentDate = () => {
    if (payment.repeat.toLowerCase() === "monthly") {
      return currentPaymentDate.add(1, "month").format("YYYY-MM-DD");
    }

    if (payment.repeat.toLowerCase() === "weekly") {
      return currentPaymentDate.add(1, "week").format("YYYY-MM-DD");
    }

    return currentPaymentDate.format("YYYY-MM-DD");
  };

  console.log("Marking payment as paid:", {
    paymentId: payment.id,
    userId,
    paidDate: paidDate.format("YYYY-MM-DD"),
    nextPaymentDate: nextPaymentDate(),
    status,
  });

  const { error: updateError } = await supabase
    .from("recurring_payments")
    .update({
      next_payment_date: nextPaymentDate(),
    })
    .eq("id", payment.id)
    .eq("user_id", userId);

  if (updateError) {
    throw new Error(
      "There was an error marking the payment as paid. " + updateError.message,
    );
  }

  const { error: historyError } = await supabase
    .from("recurring_payments_history")
    .insert({
      user_id: userId,
      payment_id: payment.id,
      name: payment.name,
      payment_date: payment.next_payment_date,
      paid_date: paidDate,
      amount: payment.amount,
      type: payment.type,
      status,
    });

  if (historyError) {
    throw new Error(
      "There was an error marking the payment as paid. " + historyError.message,
    );
  }

  return { success: true };
}
