import React from "react";
import clsx from "clsx";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
//Styles
import styles from "./PaymentsSummary.module.scss";
//Icons
import { TbArrowBigDownFilled } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";

interface PaymentsSummaryProps {
  incomePayments: RecurringPayment[];
  expensePayments: RecurringPayment[];
  incomeTotal: number;
  expenseTotal: number;
  openDetails: (type: "income" | "expense") => void;
  activeType: "income" | "expense" | null;
}

const PaymentsSummary: React.FC<PaymentsSummaryProps> = ({
  incomePayments,
  expensePayments,
  incomeTotal,
  expenseTotal,
  openDetails,
  activeType,
}) => {
  if (incomePayments.length === 0 && expensePayments.length === 0) {
    return (
      <div className={styles.upcomingPaymentsContainer}>
        <p className={styles.none}>No upcoming changes</p>
      </div>
    );
  }

  return (
    <div className={styles.upcomingPaymentsContainer}>
      {incomePayments.length > 0 && (
        <div
          className={clsx([
            styles.item,
            styles.income,
            activeType === "income" ? styles.active : "",
          ])}
          onClick={() => openDetails("income")}
        >
          <div className={`${styles.iconWrapper} ${styles.incomeIconWrapper}`}>
            <i className={styles.icon}>
              <TbArrowBigUpFilled />
            </i>
          </div>
          <div className={styles.details}>
            <span>
              {incomePayments.length}
              {` `}
              Income
            </span>
            <span className={`${styles.amount} ${styles.income}`}>
              +£{incomeTotal.toFixed(2)}
            </span>
          </div>
        </div>
      )}
      {expensePayments.length > 0 && (
        <div
          className={clsx([
            styles.item,
            styles.expense,
            activeType === "expense" ? styles.active : "",
          ])}
          onClick={() => openDetails("expense")}
        >
          <div className={`${styles.iconWrapper} ${styles.expenseIconWrapper}`}>
            <i className={styles.icon}>
              <TbArrowBigDownFilled />
            </i>
          </div>
          <div className={styles.details}>
            <span>
              {expensePayments.length}
              {` `}
              Expense
            </span>
            <span className={`${styles.amount} ${styles.expense}`}>
              -£{expenseTotal.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsSummary;
