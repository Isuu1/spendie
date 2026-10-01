import dayjs from "dayjs";
import { RecurringPayment } from "@/features/recurring-payments/types/recurringPayment";
import { Transaction } from "@/features/transactions/types/transaction";
import { createAdminClient } from "@/supabase/admin";

type MarkRecurringPaymentAutomaticallyResult = {
  success: boolean;
};

export async function markRecurringPaymentAutomatically(
  payment: RecurringPayment,
  transaction: Transaction,
): Promise<MarkRecurringPaymentAutomaticallyResult> {
  const supabase = await createAdminClient();

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

  console.log("Automatically marking recurring payment as paid:", {
    paymentId: payment.id,
    transactionId: transaction.id,
    userId: transaction.user_id,
    paidDate: paidDate.format("YYYY-MM-DD"),
    nextPaymentDate: nextPaymentDate.format("YYYY-MM-DD"),
    status,
  });

  const { error: updateError } = await supabase
    .from("recurring_payments")
    .update({
      next_payment_date: nextPaymentDate.format("YYYY-MM-DD"),
    })
    .eq("id", payment.id)
    .eq("user_id", transaction.user_id);

  if (updateError) {
    throw new Error(
      "There was an error automatically marking the payment as paid. " +
        updateError.message,
    );
  }

  const { error: historyError } = await supabase
    .from("recurring_payments_history")
    .insert({
      user_id: transaction.user_id,
      payment_id: payment.id,
      transaction_id: transaction.id,
      name: payment.name,
      payment_date: payment.next_payment_date,
      paid_date: paidDate.format("YYYY-MM-DD"),
      amount: payment.amount,
      type: payment.type,
      status,
    });

  if (historyError) {
    throw new Error(
      "There was an error recording the automatic payment history. " +
        historyError.message,
    );
  }

  return { success: true };
}
