"use client";

import React, { useState } from "react";
import moment from "moment";

//Styles
import styles from "./FutureBalance.module.scss";
//Types
import { StandingOrder } from "@/shared/types/standing-order";

interface FutureBalanceProps {
  latestStandingOrderIncome: StandingOrder | null;
  latestStandingOrderExpense: StandingOrder | null;
  totalBalance: number;
}

const FutureBalance: React.FC<FutureBalanceProps> = ({
  latestStandingOrderIncome,
  latestStandingOrderExpense,
  totalBalance,
}) => {
  const [displayedFutureBalance, setDisplayedFutureBalance] =
    useState<string>("end of the month");

  const startOfMonth = moment().startOf("month");
  const endOfMonth = moment().endOf("month");

  const calculateFutureBalance = () => {
    if (!latestStandingOrderIncome && !latestStandingOrderExpense) {
      return totalBalance; // No income date available
    }

    let incomeAmountForCalculation = 0;
    let expenseAmountForCalculation = 0;
    if (latestStandingOrderIncome && latestStandingOrderExpense) {
      const incomeDate = moment(new Date(latestStandingOrderIncome.date));
      const expenseDate = moment(new Date(latestStandingOrderExpense.date));
      if (displayedFutureBalance === "end of the month") {
        if (incomeDate.isBetween(startOfMonth, endOfMonth, null, "[]")) {
          //'[]' includes start and end dates
          incomeAmountForCalculation = latestStandingOrderIncome?.amount ?? 0;
        }

        if (expenseDate.isBetween(startOfMonth, endOfMonth, null, "[]")) {
          //'[]' includes start and end dates
          expenseAmountForCalculation = latestStandingOrderExpense?.amount ?? 0;
        }
      }
      if (displayedFutureBalance === "after next income") {
        if (incomeDate.isAfter(moment(), "day")) {
          incomeAmountForCalculation = latestStandingOrderIncome?.amount ?? 0;
        }

        if (expenseDate.isAfter(moment(), "day")) {
          expenseAmountForCalculation = latestStandingOrderExpense?.amount ?? 0;
        }
      }
    }

    return (
      totalBalance + incomeAmountForCalculation - expenseAmountForCalculation
    );
  };

  const handleFutureBalanceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    setDisplayedFutureBalance(selectedValue);
  };

  return (
    <div className={styles.futureBalance}>
      <div className={styles.range}>
        <label htmlFor="range">Time period</label>
        <select
          id="range"
          name="range"
          className={styles.select}
          onChange={handleFutureBalanceChange}
        >
          <option value="end of the month">End of the month</option>
          <option value="after next income">After next income</option>
        </select>
      </div>
      {/* {displayedFutureBalance === "end of the month" && (
          <p className={styles.rangeSubtitle}>
            {moment().endOf("month").format("DD MMMM YYYY")}
          </p>
        )}
        {displayedFutureBalance === "after next income" && (
          <p className={styles.rangeSubtitle}>
            {moment(new Date(latestStandingOrderIncome.date)).format(
              "DD MMMM YYYY"
            )}
          </p>
        )} */}
      <h2 className={styles.value}>£{calculateFutureBalance().toFixed(2)}</h2>
    </div>
  );
};

export default FutureBalance;
