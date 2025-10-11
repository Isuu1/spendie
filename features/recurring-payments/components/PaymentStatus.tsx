"use client";

import React, { useState } from "react";
import moment from "moment";
import { toast } from "react-hot-toast";
//Types
import { RecurringPayment } from "../types/recurring-payment";
import Button from "@/shared/components/ui/Button";
//Styles
import styles from "@/features/recurring-payments/components/PaymentStatus.module.scss";
import { toastStyle } from "@/shared/styles/toastStyle";
//Actions
import { markAsPaid } from "../lib/actions/markAsPaid";

const PaymentStatus = ({ payment }: { payment: RecurringPayment }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const today = moment();
  const paymentDate = moment(payment.next_payment_date);
  const daysDiff = paymentDate.diff(today, "days");

  const handleMarkAsPaid = async (payment: RecurringPayment) => {
    setLoadingId(payment.id);
    try {
      const result = await markAsPaid(payment);
      console.log("Payment marked as paid:", result);
      if (result?.error) {
        console.error("Error marking payment as paid:", result.error);
        toast.error(result.error, toastStyle);
      }
      setTimeout(() => setLoadingId(null), 500);
      toast.success("Payment marked as paid.", toastStyle);
    } catch (error) {
      console.error("Error marking payment as paid:", error);
    }
  };

  return (
    <div className={styles.statusWrapper}>
      <span className={styles.status}>
        {payment.status === "paid"
          ? "Paid"
          : payment.status === "late"
            ? `Late by ${Math.abs(daysDiff)} day(s)`
            : `Upcoming in ${daysDiff} day(s)`}
      </span>
      <Button
        text={loadingId === payment.id ? "Processing..." : "Mark as paid"}
        variant="secondary"
        size="small"
        onClick={() => handleMarkAsPaid(payment)}
        disabled={loadingId === payment.id}
      />
    </div>
  );
};

export default PaymentStatus;
