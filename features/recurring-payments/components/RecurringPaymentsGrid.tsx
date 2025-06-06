import { RecurringPayment } from "@/shared/types/recurring-payment";
import React from "react";

//Styles
import styles from "./RecurringPaymentsGrid.module.scss";

interface RecurringPaymentsGridProps {
  recurringPayments: RecurringPayment[];
}

const RecurringPaymentsGrid: React.FC<RecurringPaymentsGridProps> = ({
  recurringPayments,
}) => {
  return (
    <div>
      <ul className={styles.gridHeader}>
        <li className={styles.item}>Name</li>
        <li className={styles.item}>Date</li>
        <li className={styles.item}>Amount</li>
      </ul>
      {recurringPayments.map((payment: RecurringPayment) => (
        <div key={payment.id} className={styles.gridItem}>
          <h3>{payment.name}</h3>
          <p>{payment.date}</p>
          {/* <p>Frequency: {order.frequency}</p> */}
          <p>{payment.amount}</p>
          <p>{payment.frequency}</p>
          <p>{payment.type}</p>
          {/* <p>Status: {order.status}</p> */}
        </div>
      ))}
    </div>
  );
};

export default RecurringPaymentsGrid;
