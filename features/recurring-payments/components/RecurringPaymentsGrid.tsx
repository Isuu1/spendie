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
        size="medium"
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
          <div className={styles.menu}>
            <Button
              variant="secondary"
              size="small"
              text="Edit"
              icon={<BiSolidMessageSquareAdd />}
              iconPosition="left"
            />
            <Button
              variant="secondary"
              size="small"
              text="Delete"
              icon={<IoTrashBin />}
              iconPosition="left"
            />
          </div>
          <div className={styles.data}>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecurringPaymentsGrid;
