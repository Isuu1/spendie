"use client";

import React from "react";
import moment from "moment";
//Types
import { PopulatedRecurringPayment } from "../types/recurring-payment";
//Styles
import styles from "@/features/recurring-payments/components/PaymentStatus.module.scss";

const PaymentStatus = ({ payment }: { payment: PopulatedRecurringPayment }) => {
  const today = moment();
  const paymentDate = moment(payment.next_payment_date);
  const daysDiff = paymentDate.diff(today, "days");

  return (
    <div className={styles.statusWrapper}>
      <span className={styles.status}>
        {payment.status === "late" && `Late by ${Math.abs(daysDiff)} day(s)`}
        {payment.status === "upcoming" && `Due in ${daysDiff} day(s)`}
      </span>
    </div>
  );
};

export default PaymentStatus;
