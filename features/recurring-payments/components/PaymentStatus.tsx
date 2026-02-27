"use client";

import React from "react";
//Types
import { RecurringPayment } from "../types/recurring-payment";
//Styles
import styles from "@/features/recurring-payments/components/PaymentStatus.module.scss";
import dayjs from "dayjs";

const PaymentStatus = ({ payment }: { payment: RecurringPayment }) => {
  const today = dayjs();
  const paymentDate = dayjs(payment.next_payment_date);
  const daysDiff = paymentDate.diff(today, "days");

  const status = paymentDate.isBefore(today, "day") ? "late" : "upcoming";

  return (
    <div className={styles.statusWrapper}>
      <span className={styles.status}>
        {status === "late" && `Late by ${Math.abs(daysDiff)} day(s)`}
        {status === "upcoming" && `Due in ${daysDiff} day(s)`}
      </span>
    </div>
  );
};

export default PaymentStatus;
