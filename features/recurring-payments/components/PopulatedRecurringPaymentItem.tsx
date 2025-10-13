import React, { useState } from "react";
import moment from "moment";
//Styles
import styles from "./PopulatedRecurringPaymentItem.module.scss";
//Icons
import { FaRepeat } from "react-icons/fa6";
//Types
import { PopulatedRecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
//Components
import PaymentStatus from "@/features/recurring-payments/components/PaymentStatus";
//Animations
import { motion } from "motion/react";
import Button from "@/shared/components/ui/Button";
import { markAsPaid } from "../lib/actions/markAsPaid";
import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";
import LoadingSpinner from "@/shared/components/LoadingSpinner";

interface RecurringPaymentItemProps {
  payment: PopulatedRecurringPayment;
}

const PopulatedRecurringPaymentItem: React.FC<RecurringPaymentItemProps> = ({
  payment,
}) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleMarkAsPaid = async (payment: PopulatedRecurringPayment) => {
    setLoadingId(payment.id);
    try {
      const result = await markAsPaid(payment);

      if (result?.error) {
        console.error("Error marking payment as paid:", result.error);
        toast.error(result.error, toastStyle);
      }
      if (result?.success) {
        toast.success("Payment marked as paid.", toastStyle);
        // setTimeout(() => {
        //   setLoadingId(null);
        // }, 500);
      }
    } catch (error) {
      console.error("Error marking payment as paid:", error);
    }
  };

  return (
    <motion.div
      className={styles.paymentItemWrapper}
      //initial={false}
      //exit={{ scale: 0 }}
      layout
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onAnimationComplete={() => setLoadingId(null)}
    >
      {loadingId === payment.id && (
        <div className={styles.processingPayment}>
          <LoadingSpinner />
          <span>Processing...</span>
        </div>
      )}

      <div
        className={`${styles.paymentItem} ${styles[payment.type.toLocaleLowerCase()]}`}
      >
        <div className={styles.details}>
          <span className={styles.name}>{payment.name ?? "Income"}</span>
          <span className={styles.repeat}>
            <FaRepeat /> {payment.repeat}
          </span>
        </div>
        <span className={styles.date}>
          {moment(payment.next_payment_date).format("DD MMM `YY")}
        </span>
        <span className={styles.amount}>
          {payment.type === "income" ? "+£" : "-£"}
          {payment.amount?.toFixed(2) ?? "0.00"}
        </span>
      </div>
      <div className="flex-row-space-between">
        <PaymentStatus payment={payment} />
        <Button
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

export default PopulatedRecurringPaymentItem;
