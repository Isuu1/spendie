import moment from "moment";
import { RecurringPayment } from "../types/recurring-payment";

export const paymentStatus = (payment: RecurringPayment) => {
  const today = moment();
  const paymentDate = moment(payment.next_payment_date);
  const daysDiff = paymentDate.diff(today, "days");
  console.log(`Days difference for payment ${payment.name}:`, daysDiff);

  if (daysDiff < 0) {
    return "This payment is late";
  } else if (daysDiff === 0) {
    return "Coming in 3 days";
  } else {
    return null;
  }
};
