"use client";

import React from "react";
import dayjs from "dayjs";
import clsx from "clsx";
//Styles
import styles from "./RecurringPaymentItem.module.scss";
//Types
import { RecurringPayment } from "../types/recurring-payment";
//Components
import PaymentStatus from "./PaymentStatus";
import RecurringPaymentMenu from "./RecurringPaymentMenu";
import Modal from "@/shared/components/Modal";
import RecurringPaymentsHistory from "./RecurringPaymentsHistory";
//Animations
import { AnimatePresence } from "motion/react";

interface RecurringPaymentItemProps {
  payment: RecurringPayment;
}

const RecurringPaymentItem: React.FC<RecurringPaymentItemProps> = ({
  payment,
}) => {
  const [openHistory, setOpenHistory] = React.useState(false);

  const formatedDate = (dateStr: string) => {
    return dayjs(dateStr).format("Do MMMM YYYY");
  };

  return (
    <div key={payment.id} className={styles.gridItem}>
      <div className={styles.name}>
        <span>{payment.name}</span>
        <RecurringPaymentMenu payment={payment} />
      </div>

      <div className={styles.separator}></div>

      <div className={styles.date}>
        <span>Next payment</span>
        <span>{formatedDate(payment.next_payment_date)}</span>
      </div>

      <div className={styles.paymentStatus}>
        <PaymentStatus payment={payment} />
      </div>

      <div className={styles.frequency}>
        <span>Repeat</span>
        <span>{payment.repeat}</span>
      </div>
      <div className={styles.amount}>
        <span>Amount</span>
        <span
          className={clsx({
            [styles.income]: payment.type === "Income",
            [styles.expense]: payment.type === "Expense",
          })}
        >
          £{payment.amount}
        </span>
      </div>
      <p
        className={styles.paymentHistory}
        onClick={() => setOpenHistory(!openHistory)}
      >
        View payment history
      </p>

      <AnimatePresence>
        {openHistory && (
          <Modal onClose={() => setOpenHistory(false)}>
            <RecurringPaymentsHistory payment={payment} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecurringPaymentItem;
