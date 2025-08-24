"use client";

import React, { useState } from "react";
import moment from "moment";

//Styles
import styles from "./FutureBalance.module.scss";
//Types
import { RecurringPayment } from "@/shared/types/recurring-payment";
//Utils
import { populatePaymentsTillDate } from "@/features/recurring-payments/lib/utils/populatePaymentsTillDate";

interface FutureBalanceProps {
  recurringPayments: RecurringPayment[];
  totalBalance: number;
}

const FutureBalance: React.FC<FutureBalanceProps> = ({
  totalBalance,
  recurringPayments,
}) => {
  const endOfMonth = moment().endOf("month");

  const todaysDate = moment();

  const [selectedRange, setSelectedRange] = useState(endOfMonth);

  const incomePaymentsTillDate = populatePaymentsTillDate(
    moment(selectedRange),
    recurringPayments
  ).filter((payment) => payment.type.toLowerCase() === "income");

  const incomePaymentsTillDateAmount = incomePaymentsTillDate.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const expensePaymentsTillDate = populatePaymentsTillDate(
    moment(selectedRange),
    recurringPayments
  ).filter((payment) => payment.type.toLowerCase() === "expense");

  const expensePaymentsTillDateAmount = expensePaymentsTillDate.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "end of the month") {
      setSelectedRange(endOfMonth);
    }
    if (event.target.value === "by date") {
      const selectedDate = prompt("Please enter a date (YYYY-MM-DD):");
      if (selectedDate) {
        const parsedDate = moment(selectedDate, "YYYY-MM-DD");
        if (parsedDate.isValid()) {
          setSelectedRange(parsedDate);
        } else {
          alert("Invalid date format. Please use YYYY-MM-DD.");
        }
      }
    }
  };

  const calculateFutureBalance = () => {
    return (
      totalBalance +
      incomePaymentsTillDate.reduce((sum, payment) => sum + payment.amount, 0) -
      expensePaymentsTillDate.reduce((sum, payment) => sum + payment.amount, 0)
    );
  };

  return (
    <div className={styles.futureBalance}>
      <div className={styles.menu}>
        <p>Upcoming changes by</p>
        <div className={styles.range}>
          <label htmlFor="range">Time period</label>
          <select
            id="range"
            name="range"
            className={styles.select}
            onChange={handleRangeChange}
          >
            <option value="end of the month">
              End of {todaysDate.format("MMMM")}
            </option>
            <option value="by date">Select date</option>
          </select>
        </div>
      </div>
      <div className={styles.upcomingChanges}>
        {incomePaymentsTillDate.length > 0 && (
          <div className={styles.upcomingIncomes}>
            {incomePaymentsTillDate.length} income - £
            {incomePaymentsTillDateAmount.toFixed(2)}{" "}
          </div>
        )}
        {expensePaymentsTillDate.length > 0 && (
          <div className={styles.upcomingExpenses}>
            {expensePaymentsTillDate.length} expense - £
            {expensePaymentsTillDateAmount.toFixed(2)}{" "}
          </div>
        )}
      </div>
      <div className={styles.balance}>
        <strong>Balance after</strong>
        <h2 className={styles.value}>£{calculateFutureBalance().toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default FutureBalance;
