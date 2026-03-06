import React, { useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
//Styles
import styles from "./DashboardRecurringPaymentItem.module.scss";
import { toastStyle } from "@/shared/styles/toastStyle";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
//Components
import PaymentStatus from "@/features/recurring-payments/components/PaymentStatus";
import Button from "@/shared/components/ui/Button";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
//Animations
import { motion } from "motion/react";
//Actions
import { markAsPaid } from "../lib/actions/markAsPaid";

interface RecurringPaymentItemProps {
  payment: RecurringPayment;
}

const DashboardRecurringPaymentItem: React.FC<RecurringPaymentItemProps> = ({
  payment,
}) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleMarkAsPaid = async (payment: RecurringPayment) => {
    setLoadingId(payment.id);
    try {
      const result = await markAsPaid(payment);

      if (result?.error) {
        console.error("Error marking payment as paid:", result.error);
        toast.error(result.error, toastStyle);
      }
      if (result?.success) {
        toast.success("Payment marked as paid.", toastStyle);
      }
    } catch (error) {
      console.error("Error marking payment as paid:", error);
    }
    setLoadingId(null);
  };

  const formatedDate = (dateStr: string) => {
    return dayjs(dateStr).format("D MMMM YYYY");
  };

  return (
    <motion.div
      className={styles.paymentItemWrapper}
      layout
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onAnimationComplete={() => setLoadingId(null)}
    >
      {loadingId === payment.id && (
        <div className={styles.processingPayment}>
          <LoadingSpinner />
        </div>
      )}

      <div
        className={`${styles.paymentItem} ${styles[payment.type.toLocaleLowerCase()]}`}
      >
        <div className={styles.details}>
          <span className={styles.name}>{payment.name ?? "Income"}</span>
          <span className={styles.amount}>
            {payment.type === "Income" ? "+£" : "-£"}
            {payment.amount?.toFixed(2) ?? "0.00"}
          </span>
        </div>

        <div className={styles.date}>
          <span>{formatedDate(payment.next_payment_date)}</span>
          <PaymentStatus payment={payment} />
        </div>

        <Button
          className={styles.paidButton}
          text={loadingId === payment.id ? "Processing..." : "Mark as paid"}
          variant="secondary"
          size="small"
          onClick={() => handleMarkAsPaid(payment)}
          disabled={loadingId === payment.id}
        />
      </div>
    </motion.div>
  );
};

export default DashboardRecurringPaymentItem;
