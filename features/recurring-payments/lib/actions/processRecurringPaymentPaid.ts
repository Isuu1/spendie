"use server";

import dayjs from "dayjs";
import { RecurringPayment } from "../../types/recurringPayment";
import { createAdminClient } from "@/supabase/admin";

type ProcessRecurringPaymentPaidParams = {
  payment: RecurringPayment;
  userId: string;
  transactionId?: string;
};

type ProcessRecurringPaymentPaidResult = {
  success: boolean;
};

export async function processRecurringPaymentPaid({
  payment,
  userId,
  transactionId,
}: ProcessRecurringPaymentPaidParams): Promise<ProcessRecurringPaymentPaidResult> {
  const supabase = createAdminClient();

  const paidDate = dayjs();
  const paymentDate = dayjs(payment.next_payment_date);

  const daysDiff = paidDate.diff(paymentDate, "day");

  const status =
    paidDate.isBefore(paymentDate) || paidDate.isSame(paymentDate, "day")
      ? "On time"
      : `Late by ${daysDiff} ${daysDiff === 1 ? "day" : "days"}`;

  const currentPaymentDate = dayjs(payment.next_payment_date);

  let nextPaymentDate = currentPaymentDate;

  if (payment.repeat.toLowerCase() === "monthly") {
    nextPaymentDate = currentPaymentDate.add(1, "month");
  } else if (payment.repeat.toLowerCase() === "weekly") {
    nextPaymentDate = currentPaymentDate.add(1, "week");
  }

  const { error } = await supabase.rpc("mark_recurring_payment_as_paid", {
    p_payment_id: payment.id,
    p_user_id: userId,
    p_transaction_id: transactionId ?? null,
    p_paid_date: paidDate.format("YYYY-MM-DD"),
    p_next_payment_date: nextPaymentDate.format("YYYY-MM-DD"),
    p_name: payment.name,
    p_payment_date: paymentDate.format("YYYY-MM-DD"),
    p_amount: payment.amount,
    p_type: payment.type,
    p_status: status,
  });

  if (error) {
    throw new Error(
      "There was an error marking the payment as paid. " + error.message,
    );
  }

  return { success: true };
}
