import { Transaction } from "@/features/transactions/types/transaction";
import { createAdminClient } from "@/supabase/admin";
import dayjs from "dayjs";

export async function findMatchingRecurringPayment(transaction: Transaction) {
  const supabase = createAdminClient();

  const { data: payments, error } = await supabase
    .from("recurring_payments")
    .select("*")
    .eq("user_id", transaction.user_id)
    .eq("account_id", transaction.account_id)
    .eq("amount", transaction.amount)
    .eq("is_paused", false);

  if (error) {
    throw new Error(`Error fetching recurring payments: ${error.message}`);
  }

  const matchingPayments = [];

  for (const payment of payments) {
    const paymentDate = dayjs(payment.next_payment_date);
    const transactionDate = dayjs(transaction.date);

    const daysDifference = Math.abs(transactionDate.diff(paymentDate, "day"));

    // Transaction must be within 2 days of expected payment date
    if (daysDifference > 2) {
      continue;
    }

    // Check whether this occurrence has already been paid
    const { data: existingHistory, error: historyError } = await supabase
      .from("recurring_payments_history")
      .select("id")
      .eq("payment_id", payment.id)
      .eq("payment_date", dayjs(payment.next_payment_date).format("YYYY-MM-DD"))
      .or(`transaction_id.eq.${transaction.id},transaction_id.is.null`)
      .limit(1)
      .maybeSingle();

    if (historyError) {
      throw new Error(
        `Error checking recurring payment history: ${historyError.message}`,
      );
    }

    if (existingHistory) {
      continue;
    }

    matchingPayments.push(payment);
    console.log("Found matching recurring payment:", {
      paymentId: payment.id,
      transactionId: transaction.id,
      transactionDate: transaction.date,
      expectedPaymentDate: payment.next_payment_date,
    });
  }

  if (matchingPayments.length !== 1) {
    return null;
  }

  return matchingPayments[0];
}
