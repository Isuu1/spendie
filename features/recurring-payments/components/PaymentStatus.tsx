"use client";

import dayjs from "dayjs";
//Types
import { RecurringPayment } from "../types/recurringPayment";

const PaymentStatus = ({ payment }: { payment: RecurringPayment }) => {
  const today = dayjs();
  const paymentDate = dayjs(payment.next_payment_date);
  const daysDiff = paymentDate.diff(today, "days");

  const daysDifference = () => {
    if (daysDiff === 0) {
      return "Due today";
    }
    if (daysDiff > 0) {
      return `Due in ${daysDiff} day(s)`;
    }
    if (daysDiff < 0) {
      return `Late by ${Math.abs(daysDiff)} day(s)`;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-accent font-bold">{daysDifference()}</span>
    </div>
  );
};

export default PaymentStatus;
