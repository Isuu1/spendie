import React from "react";
import { RecurringPaymentHistory } from "../types/recurring-payment";
import dayjs from "dayjs";
import { BsHandThumbsUpFill } from "react-icons/bs";
//Styles
import styles from "./RecurringPaymentsHistory.module.scss";

import { MdWatchLater } from "react-icons/md";
import clsx from "clsx";

interface PaymentHistoryStatusProps {
  paymentHistory: RecurringPaymentHistory;
}

const PaymentHistoryStatus = ({
  paymentHistory,
}: PaymentHistoryStatusProps) => {
  const paidDate = dayjs(paymentHistory.paid_date);
  const paymentDate = dayjs(paymentHistory.payment_date);
  const daysDiff = paidDate.diff(paymentDate, "day");

  if (paidDate.isBefore(paymentDate) || paidDate.isSame(paymentDate, "day")) {
    return (
      <li className={clsx(styles.status, styles.onTime)}>
        <BsHandThumbsUpFill /> On time
      </li>
    );
  }
  return (
    <li className={clsx(styles.status, styles.late)}>
      <MdWatchLater /> {daysDiff} {daysDiff === 1 ? "day" : "days"} late
    </li>
  );
};

export default PaymentHistoryStatus;
