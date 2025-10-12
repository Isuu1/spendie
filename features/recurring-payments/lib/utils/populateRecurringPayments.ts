import {
  PopulatedRecurringPayment,
  RecurringPayment,
  RecurringPaymentHistory,
} from "@/features/recurring-payments/types/recurring-payment";
import moment, { Moment } from "moment";

export function populateRecurringPayments(
  targetDate: Moment,
  payments: RecurringPayment[],
  paymentHistory: RecurringPaymentHistory[]
) {
  const populated: PopulatedRecurringPayment[] = [];

  //Create occurrences for each payment up to the target date from the first payment date
  payments.forEach((payment) => {
    const firstPaymentDate = moment(payment.first_payment_date);

    const occurrence = firstPaymentDate.clone();

    while (occurrence.isSameOrBefore(targetDate, "day")) {
      // Check payment history to see if this payment has been marked as paid
      const isPaid = paymentHistory.some(
        (history) =>
          history.payment_id === payment.id &&
          moment(history.payment_date).isSame(occurrence, "day")
      );

      //If not paid, add to populated list with status
      if (!isPaid) {
        populated.push({
          ...payment,
          next_payment_date: occurrence.format("YYYY-MM-DD"),
          status: occurrence.isBefore(moment(), "day") ? "late" : "upcoming",
        });
      }

      if (payment.repeat.toLowerCase() === "monthly") {
        occurrence.add(1, "month");
      } else if (payment.repeat.toLowerCase() === "weekly") {
        occurrence.add(1, "week");
      }
    }
  });

  return populated;
}
