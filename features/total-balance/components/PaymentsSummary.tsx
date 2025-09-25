import React from "react";
//Types
import { RecurringPayment } from "@/shared/types/recurring-payment";
//Styles
import styles from "./PaymentsSummary.module.scss";
//Icons
import { TbArrowBigDownFilled } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";

interface PaymentsSummaryProps {
  paymentsTillDate: RecurringPayment[];
  toggleDetails: (type: "income" | "expense" | null) => void;
  type?: "income" | "expense" | null;
}

const PaymentsSummary: React.FC<PaymentsSummaryProps> = ({
  paymentsTillDate,
  toggleDetails,
  type,
}) => {
  const incomes = paymentsTillDate.filter(
    (p) => p.type.toLowerCase() === "income"
  );
  const expenses = paymentsTillDate.filter(
    (p) => p.type.toLowerCase() === "expense"
  );

  const incomeTotal = incomes.reduce((sum, p) => sum + p.amount, 0);
  const expenseTotal = expenses.reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      <div className={styles.upcomingPaymentsContainer}>
        {incomes.length > 0 && (
          <div
            className={`${styles.item} ${styles.income} ${
              type === "income" ? styles.active : ""
            }`}
            onClick={() => toggleDetails("income")}
          >
            <div
              className={`${styles.iconWrapper} ${styles.incomeIconWrapper}`}
            >
              <i className={styles.icon}>
                <TbArrowBigUpFilled />
              </i>
            </div>
            <div className={styles.details}>
              <span>
                {incomes.length}
                {` `}
                Income
              </span>
              <span className={`${styles.amount} ${styles.income}`}>
                +£{incomeTotal.toFixed(2)}
              </span>
            </div>
          </div>
        )}
        {expenses.length > 0 && (
          <div
            className={`${styles.item} ${styles.expense} ${
              type === "expense" ? styles.active : ""
            }`}
            onClick={() => toggleDetails("expense")}
          >
            <div
              className={`${styles.iconWrapper} ${styles.expenseIconWrapper}`}
            >
              <i className={styles.icon}>
                <TbArrowBigDownFilled />
              </i>
            </div>
            <div className={styles.details}>
              <span>
                {expenses.length}
                {` `}
                Expense
              </span>
              <span className={`${styles.amount} ${styles.expense}`}>
                -£{expenseTotal.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {paymentsTillDate.length === 0 && (
          <p className={styles.none}>No upcoming changes</p>
        )}
      </div>
    </>
  );
};

export default PaymentsSummary;
