import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
import moment, { Moment } from "moment";

export function populateRecurringPayments(
  targetDate: Moment,
  payments: RecurringPayment[]
) {
  const populated: RecurringPayment[] = [];

  const todaysDate = moment();

  console.log("Target date:", targetDate.format("YYYY-MM-DD"));

  payments.forEach((payment) => {
    const nextPaymentDate = moment(payment.next_payment_date);
    console.log("payment:", payment);

    const occurrence = nextPaymentDate.clone();
    const occurrenceStr = occurrence.format("YYYY-MM-DD");
    console.log("Monthly occurrence:", occurrenceStr);

    while (occurrence.isSameOrBefore(targetDate, "day")) {
      // only include occurrences from today onwards (and not mocked paid)
      if (occurrence.isSameOrAfter(todaysDate, "day")) {
        populated.push({
          ...payment,
          // `date` is the specific occurrence date you'll show in UI
          date: occurrenceStr,
          // optional: set next_payment_date to the "next after this occurrence"
          next_payment_date: occurrence
            .clone()
            //.add(1, "month")
            .format("YYYY-MM-DD"),
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
