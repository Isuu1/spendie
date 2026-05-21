"use client";

//Types
import { RecurringPayment } from "../types/recurringPayment";
//Styles
import styles from "@/features/recurring-payments/components/PaymentStatus.module.scss";
import dayjs from "dayjs";

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
    <div className={styles.statusWrapper}>
      <span className="text-accent font-bold">{daysDifference()}</span>
    </div>
  );
};

export default PaymentStatus;
