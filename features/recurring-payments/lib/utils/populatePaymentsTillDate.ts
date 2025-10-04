import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
import moment from "moment";

export const populatePaymentsTillDate = (
  targetDate: moment.Moment,
  recurringPayments: RecurringPayment[]
) => {
  //This function populates all recurring payments that occur till selected date
  //It includes monthly and weekly payments i.e if you add a payment occurs every week, it will add all occurrences till the target date
  const todaysDate = moment();
  // console.log("Target date:", targetDate);
  const populatedPayments: RecurringPayment[] = [];
  const paymentsByDate = recurringPayments.filter((payment) =>
    moment(payment.date).isBetween(todaysDate, targetDate, null, "[]")
  );
  // console.log("All payments this month:", paymentsByDate);
  paymentsByDate.forEach((payment) => {
    if (targetDate < todaysDate) {
      return;
    }
    if (payment.repeat.toLowerCase() === "monthly") {
      // For monthly payments, we only need to ensure their initial 'date'
      // falls within or before the current month if it's meant to repeat.
      // Assuming 'payment.date' is the first occurrence.
      const paymentDate = moment(payment.date);
      if (paymentDate.isSameOrBefore(targetDate, "month")) {
        populatedPayments.push(payment);
      }
    }
    if (payment.repeat.toLowerCase() === "weekly") {
      const currentPaymentDate = moment(payment.date);
      // Loop to find all occurrences within the current month
      // Start checking from the original payment date
      while (currentPaymentDate.isSameOrBefore(targetDate, "day")) {
        // Only add if the payment date is today or in the future
        // and within the current month
        if (
          currentPaymentDate.isSameOrAfter(todaysDate, "day") &&
          currentPaymentDate.isSameOrBefore(targetDate, "day")
        ) {
          populatedPayments.push({
            ...payment,
            date: currentPaymentDate.format("YYYY-MM-DD"),
          }); // Add a clone or new object to avoid reference issues and update date
        }
        // Move to the next week
        currentPaymentDate.add(1, "week");
      }
    }
  });
  // console.log("Upcoming payments:", populatedPayments);
  return populatedPayments;
};
