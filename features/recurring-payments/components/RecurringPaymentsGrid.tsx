import React from "react";

//Styles
import styles from "./RecurringPaymentsGrid.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { BiSolidMessageSquareAdd } from "react-icons/bi";

//Types
import { RecurringPayment } from "@/shared/types/recurring-payment";
import Button from "@/shared/components/ui/Button";

interface RecurringPaymentsGridProps {
  recurringPayments: RecurringPayment[];
}

const RecurringPaymentsGrid: React.FC<RecurringPaymentsGridProps> = ({
  recurringPayments,
}) => {
  return (
    <div className={styles.gridContainer}>
      <Button
        variant="primary"
        text="New"
        icon={<BiSolidMessageSquareAdd />}
        iconPosition="left"
      />
      {/* <ul className={styles.gridHeader}>
        <li className={styles.item}></li>
        <li className={styles.item}>Date</li>
        <li className={styles.item}>Repeat</li>
        <li className={styles.item}>Amount</li>
      </ul> */}
      {recurringPayments.map((payment: RecurringPayment) => (
        <div key={payment.id} className={styles.gridItem}>
          <div className={styles.details}>
            <p>{payment.name}</p>
            <p className={styles.date}>{payment.date}</p>
          </div>
          <p className={styles.frequency}>{payment.frequency}</p>
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
          <i className={styles.remove}>
            <IoTrashBin />
          </i>
        </div>
      ))}
    </div>
  );
};

export default RecurringPaymentsGrid;
