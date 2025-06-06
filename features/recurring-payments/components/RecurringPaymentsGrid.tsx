import React from "react";

//Styles
import styles from "./RecurringPaymentsGrid.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
//Types
import { RecurringPayment } from "@/shared/types/recurring-payment";

interface RecurringPaymentsGridProps {
  recurringPayments: RecurringPayment[];
}

const RecurringPaymentsGrid: React.FC<RecurringPaymentsGridProps> = ({
  recurringPayments,
}) => {
  return (
    <div className={styles.gridContainer}>
      <ul className={styles.gridHeader}>
        <li className={styles.item}></li>
        <li className={styles.item}>Date</li>
        <li className={styles.item}>Repeat</li>
        <li className={styles.item}>Amount</li>
      </ul>
      {recurringPayments.map((payment: RecurringPayment) => (
        <div key={payment.id} className={styles.gridItem}>
          <p>{payment.name}</p>
          <p>{payment.date}</p>
          <p>{payment.frequency}</p>
          {payment.type === "income" ? (
            <div className={`${styles.type} ${styles.income}`}>
              <FaLongArrowAltUp />
              <span>£{payment.amount}</span>
            </div>
          ) : (
            <div className={`${styles.type} ${styles.expense}`}>
              <FaLongArrowAltDown />
              <span>£{payment.amount}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecurringPaymentsGrid;
