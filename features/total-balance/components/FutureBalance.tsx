"use client";

import React, { useState } from "react";
import moment, { Moment } from "moment";

//Styles
import styles from "./FutureBalance.module.scss";
//Types
import { RecurringPayment } from "@/shared/types/recurring-payment";
//Utils
import { populatePaymentsTillDate } from "@/features/recurring-payments/lib/utils/populatePaymentsTillDate";
//Components
import Select from "@/features/total-balance/components/Select";

interface FutureBalanceProps {
  recurringPayments: RecurringPayment[];
  totalBalance: number;
}

const calculateTotals = (payments: RecurringPayment[]) => {
  const income = payments
    .filter((p) => p.type.toLowerCase() === "income")
    .reduce((sum, p) => sum + p.amount, 0);

  const expense = payments
    .filter((p) => p.type.toLowerCase() === "expense")
    .reduce((sum, p) => sum + p.amount, 0);

  return { income, expense };
};

type Mode = "endOfMonth" | "specificDate";

const FutureBalance: React.FC<FutureBalanceProps> = ({
  totalBalance,
  recurringPayments,
}) => {
  //States
  const [mode, setMode] = useState<Mode>("endOfMonth");
  const [dateSelected, setDateSelected] = useState<Moment | null>(null);

  //Payments filtering
  const specificDate =
    mode === "endOfMonth" ? moment().endOf("month") : dateSelected;

  const paymentsTillDate = populatePaymentsTillDate(
    specificDate || moment().endOf("month"),
    recurringPayments
  );

  const { income, expense } = calculateTotals(paymentsTillDate);

  const futureBalance = totalBalance + income - expense;

  return (
    <div className={styles.futureBalance}>
      <Select
        mode={mode}
        dateSelected={dateSelected}
        onDateSelect={setDateSelected}
        onRangeSelect={setMode}
      />
      <div className={styles.upcomingChanges}>
        {income > 0 && (
          <div className={styles.upcomingIncomes}>
            {
              paymentsTillDate.filter((p) => p.type.toLowerCase() === "income")
                .length
            }{" "}
            income – £{income.toFixed(2)}
          </div>
        )}
        {expense > 0 && (
          <div className={styles.upcomingExpenses}>
            {
              paymentsTillDate.filter((p) => p.type.toLowerCase() === "expense")
                .length
            }{" "}
            expense - £{expense.toFixed(2)}
          </div>
        )}
        {income === 0 && expense === 0 && (
          <p className={styles.noChanges}>No upcoming changes</p>
        )}
      </div>
      <div className={styles.balance}>
        <strong>Balance</strong>
        <h2 className={styles.value}>£{futureBalance.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default FutureBalance;
