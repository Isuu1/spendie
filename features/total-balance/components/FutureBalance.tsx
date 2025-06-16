"use client";

import React from "react";
import moment from "moment";

//Styles
import styles from "./FutureBalance.module.scss";
//Types
import { RecurringPayment } from "@/shared/types/recurring-payment";

interface FutureBalanceProps {
  recurringPayments: RecurringPayment[];
  totalBalance: number;
}

const FutureBalance: React.FC<FutureBalanceProps> = ({
  totalBalance,
  recurringPayments,
}) => {
  const todaysDate = moment();

  const endOfMonth = moment().endOf("month");

  const incomePaymentsThisMonth = recurringPayments
    .filter((payment) => payment.type.toLowerCase() === "income")
    .filter((payment) =>
      moment(new Date(payment.date)).isBetween(
        todaysDate,
        endOfMonth,
        null,
        "[]"
      )
    );

  const expensePaymentsThisMonth = recurringPayments
    .filter((payment) => payment.type.toLowerCase() === "expense")
    .filter((payment) =>
      moment(new Date(payment.date)).isBetween(
        todaysDate,
        endOfMonth,
        null,
        "[]"
      )
    );

  const calculateFutureBalance = () => {
    return (
      totalBalance +
      incomePaymentsThisMonth.reduce(
        (sum, payment) => sum + payment.amount,
        0
      ) -
      expensePaymentsThisMonth.reduce((sum, payment) => sum + payment.amount, 0)
    );
  };

  return (
    <>
      <div className={styles.futureBalance}>
        <div className={styles.balance}>
          <p>End of the month balance</p>
          <h2 className={styles.value}>
            £{calculateFutureBalance().toFixed(2)}
          </h2>
        </div>
        <div className={styles.upcomingChanges}>
          {incomePaymentsThisMonth.length > 0 && (
            <div className={styles.upcomingIncomes}>
              {incomePaymentsThisMonth.length} upcoming incomes
            </div>
          )}
          {expensePaymentsThisMonth.length > 0 && (
            <div className={styles.upcomingExpenses}>
              {expensePaymentsThisMonth.length} upcoming expenses
            </div>
          )}
        </div>

        {/* <div className={styles.range}>
          <label htmlFor="range">Time period</label>
          <select
            id="range"
            name="range"
            className={styles.select}
            onChange={handleFutureBalanceChange}
          >
            <option value="end of the month">End of the month</option>
            <option value="by date">Specific date</option>
          </select>
        </div> */}
      </div>
    </>
  );
};

export default FutureBalance;
