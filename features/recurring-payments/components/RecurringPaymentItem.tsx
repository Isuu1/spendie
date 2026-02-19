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

interface RecurringPaymentItemProps {
  payment: RecurringPayment;
  populatedPayment?: PopulatedRecurringPayment;
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
      <div className={styles.details}>
        <p className={styles.name}>{payment.name}</p>

        {populatedPayment && (
          <>
            <p className={styles.date}>
              Next payment: {formatedDate(populatedPayment.next_payment_date)}
            </p>
            <PaymentStatus payment={populatedPayment} />
          </>
        )}

        <p
          className={styles.paymentHistory}
          onClick={() => setOpenHistory(!openHistory)}
        >
          View history
        </p>
      </div>
      <p className={styles.frequency}>{payment.repeat}</p>
      <div
        className={`${styles.type} ${payment.type === "Income" ? styles.income : styles.expense}`}
      >
        <p>£{payment.amount}</p>
      </div>
      <RecurringPaymentMenu payment={payment} />
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
