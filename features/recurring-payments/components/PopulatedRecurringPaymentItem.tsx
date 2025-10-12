import React from "react";
import moment from "moment";
//Styles
import styles from "./PopulatedRecurringPaymentItem.module.scss";
//Icons
import { FaRepeat } from "react-icons/fa6";
//Types
import { PopulatedRecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
//Components
import PaymentStatus from "@/features/recurring-payments/components/PaymentStatus";

interface RecurringPaymentItemProps {
  payment: PopulatedRecurringPayment;
}

const PopulatedRecurringPaymentItem: React.FC<RecurringPaymentItemProps> = ({
  payment,
}) => {
  return (
    <div className={styles.paymentItemWrapper}>
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
      <PaymentStatus payment={payment} />
    </div>
  );
};

export default PopulatedRecurringPaymentItem;
