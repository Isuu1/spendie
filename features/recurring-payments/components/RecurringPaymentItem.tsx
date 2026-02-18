import React from "react";
//Styles
import styles from "./RecurringPaymentItem.module.scss";
import {
  PopulatedRecurringPayment,
  RecurringPayment,
} from "../types/recurring-payment";
import PaymentStatus from "./PaymentStatus";
import moment from "moment";
import RecurringPaymentMenu from "./RecurringPaymentMenu";

interface RecurringPaymentItemProps {
  payment: RecurringPayment;
  populatedPayment?: PopulatedRecurringPayment;
}

const RecurringPaymentItem: React.FC<RecurringPaymentItemProps> = ({
  payment,
  populatedPayment,
}) => {
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
      </div>
      <p className={styles.frequency}>{payment.repeat}</p>
      <div
        className={`${styles.type} ${payment.type === "Income" ? styles.income : styles.expense}`}
      >
        <p>£{payment.amount}</p>
      </div>
      <RecurringPaymentMenu payment={payment} />
    </div>
  );
};

export default RecurringPaymentItem;
