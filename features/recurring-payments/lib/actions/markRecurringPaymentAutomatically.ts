"use server";

import { RecurringPayment } from "@/features/recurring-payments/types/recurringPayment";
import { Transaction } from "@/features/transactions/types/transaction";
import { processRecurringPaymentPaid } from "./processRecurringPaymentPaid";

export async function markRecurringPaymentAutomatically(
  payment: RecurringPayment,
  transaction: Transaction,
) {
  return processRecurringPaymentPaid({
    payment,
    userId: transaction.user_id,
    transactionId: transaction.id,
  });
}
