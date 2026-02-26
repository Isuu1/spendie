"use client";

import React from "react";
import moment from "moment";
//Styles
import styles from "./RecurringPaymentItem.module.scss";
//Types
import {
  PopulatedRecurringPayment,
  RecurringPayment,
} from "../types/recurring-payment";
//Components
import PaymentStatus from "./PaymentStatus";
import RecurringPaymentMenu from "./RecurringPaymentMenu";
import Modal from "@/shared/components/Modal";
import RecurringPaymentsHistory from "./RecurringPaymentsHistory";
//Animations
import { AnimatePresence } from "motion/react";
import clsx from "clsx";

interface RecurringPaymentItemProps {
  payment: RecurringPayment;
  populatedPayment: PopulatedRecurringPayment;
}

const RecurringPaymentItem: React.FC<RecurringPaymentItemProps> = ({
  payment,
  populatedPayment,
}) => {
  const [openHistory, setOpenHistory] = React.useState(false);

  const formatedDate = (dateStr: string) => {
    return moment(dateStr).format("Do MMMM YYYY");
  };

  return (
    <div key={payment.id} className={styles.gridItem}>
      {/* <div className={styles.details}> */}
      <div className={styles.name}>
        {/* <span>Name</span> */}
        <span>{payment.name}</span>
        <RecurringPaymentMenu payment={payment} />
      </div>

      <div className={styles.separator}></div>

      {populatedPayment && (
        <>
          <div className={styles.date}>
            <span>Next payment</span>
            <span>{formatedDate(populatedPayment.next_payment_date)}</span>
          </div>
        </>
      )}
      <div className={styles.paymentStatus}>
        <PaymentStatus payment={populatedPayment} />
      </div>

      {/* </div> */}
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
