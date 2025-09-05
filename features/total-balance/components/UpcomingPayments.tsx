import { RecurringPayment } from "@/shared/types/recurring-payment";
import React from "react";

//Styles
import styles from "./UpcomingPayments.module.scss";
//Icons
import { TbArrowBigDownFilled } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";

interface UpcomingPaymentsProps {
  paymentsTillDate: RecurringPayment[];
  toggleDetails: (type: "income" | "expense" | null) => void;
  showUpcomingChangeDetails?: "income" | "expense" | null;
}

const UpcomingPayments: React.FC<UpcomingPaymentsProps> = ({
  paymentsTillDate,
  toggleDetails,
  showUpcomingChangeDetails,
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
        {/* {showUpcomingChangeDetails === "income" && (
          <div className={styles.paymentsList}>
            {paymentsTillDate
              .filter((p) => p.type.toLowerCase() === "income")
              .map((payment, idx) => (
                <div key={payment.id ?? idx} className={styles.paymentItem}>
                  <div className={styles.details}>
                    <span>{payment.name ?? "Income"}</span>
                    <span>{moment(payment.date).format("DD MMM `YY")}</span>
                  </div>
                  <div className={styles.amount}>
                    £{payment.amount?.toFixed(2) ?? "0.00"}
                  </div>
                </div>
              ))}
          </div>
        )}
        {showUpcomingChangeDetails === "expense" && (
          <div className={styles.paymentsList}>
            {paymentsTillDate
              .filter((p) => p.type.toLowerCase() === "expense")
              .map((payment, idx) => (
                <div key={payment.id ?? idx} className={styles.paymentItem}>
                  <div className={styles.details}>
                    <span>{payment.name ?? "Expense"}</span>
                    <span>£{payment.amount?.toFixed(2) ?? "0.00"}</span>
                  </div>
                  <div className={styles.amount}>
                    {moment(payment.date).format("DD MMM `YY")}
                  </div>
                </div>
              ))}
          </div>
        )} */}
        {incomes.length > 0 && (
          <div
            className={`${styles.item} ${styles.income} ${
              showUpcomingChangeDetails === "income" ? styles.active : ""
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
              showUpcomingChangeDetails === "expense" ? styles.active : ""
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

export default UpcomingPayments;
