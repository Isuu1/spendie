import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
import dayjs, { Dayjs } from "dayjs";

export function populateRecurringPayments(
  targetDate: Dayjs,
  payments: RecurringPayment[],
) {
  const populated: RecurringPayment[] = [];

  //Create occurrences for each payment up to the target date from the first payment date
  payments.forEach((payment) => {
    let occurrence = dayjs(payment.next_payment_date);

    while (
      occurrence.isBefore(targetDate, "day") ||
      occurrence.isSame(targetDate, "day")
    ) {
      populated.push({
        ...payment,
        next_payment_date: occurrence.format("YYYY-MM-DD"),
      });

      if (payment.repeat.toLowerCase() === "monthly") {
        occurrence = occurrence.add(1, "month");
      } else if (payment.repeat.toLowerCase() === "weekly") {
        occurrence = occurrence.add(1, "week");
      }
    }
  });

  return populated;
}
