import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
import moment, { Moment } from "moment";

export function populateRecurringPayments(
  targetDate: Moment,
  payments: RecurringPayment[]
) {
  const populated: RecurringPayment[] = [];

  payments.forEach((payment) => {
    const addPaymentDate = moment(payment.add_payment_date);

    const occurrence = addPaymentDate.clone();

    while (occurrence.isSameOrBefore(targetDate, "day")) {
      populated.push({
        ...payment,
        next_payment_date: occurrence.clone().format("YYYY-MM-DD"),
        status: occurrence.isBefore(moment(), "day") ? "late" : "upcoming",
      });

      if (payment.repeat.toLowerCase() === "monthly") {
        occurrence.add(1, "month");
      } else if (payment.repeat.toLowerCase() === "weekly") {
        occurrence.add(1, "week");
      }
    }
  });

  return populated;
}
