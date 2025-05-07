import React, { useState } from "react";
import moment from "moment";

//Styles
import styles from "./TotalBalanceTile.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
//Providers
import { useUser } from "@/shared/providers/UserProvider";
import { useAccounts } from "@/shared/providers/AccountsProvider";

const TotalBalanceTile = () => {
  const { accounts } = useAccounts();
  const { user } = useUser();

  const [displayedBalance, setDisplayedBalance] =
    useState<string>("end of the month");

  console.log("displayedBalance", displayedBalance);

  if (!accounts) {
    return <p>Loading...</p>;
  }

  const totalBalance = accounts?.reduce((sum, currentAccount) => {
    const currentBalance = currentAccount.balances.current ?? 0;
    return sum + currentBalance;
  }, 0);

  const getLatestStandingOrder = (type: string) => {
    const filteredByType = user?.standing_orders?.filter(
      (standingOrder) => standingOrder.type === type
    );
    if (!filteredByType || filteredByType.length === 0) {
      return null; //No standing orders of this type
    }

    const sortedStandingOrders = filteredByType.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    return sortedStandingOrders[0] ?? null;
  };

  const latestStandingOrderIncome = getLatestStandingOrder("income");
  const latestStandingOrderExpense = getLatestStandingOrder("expense");

  const calculateFutureBalance = () => {
    const currentBalance = totalBalance ?? 0;

    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");

    let incomeAmountForCalculation = 0;
    let expenseAmountForCalculation = 0;
    if (displayedBalance === "end of the month") {
      if (latestStandingOrderIncome?.date) {
        const incomeDate = moment(new Date(latestStandingOrderIncome.date));
        console.log("incomeDate", incomeDate);

        if (incomeDate.isBetween(startOfMonth, endOfMonth, null, "[]")) {
          //'[]' includes start and end dates
          incomeAmountForCalculation = latestStandingOrderIncome.amount ?? 0;
        }
      }
      if (latestStandingOrderExpense?.date) {
        const expenseDate = moment(new Date(latestStandingOrderExpense.date));
        if (expenseDate.isBetween(startOfMonth, endOfMonth, null, "[]")) {
          //'[]' includes start and end dates
          expenseAmountForCalculation = latestStandingOrderExpense.amount ?? 0;
        }
      }
    }
    if (displayedBalance === "after next income") {
      if (latestStandingOrderIncome?.date) {
        const incomeDate = moment(new Date(latestStandingOrderIncome.date));
        console.log("incomeDate", incomeDate);

        if (incomeDate.isAfter(moment(), "day")) {
          incomeAmountForCalculation = latestStandingOrderIncome.amount ?? 0;
        }
      }
      if (latestStandingOrderExpense?.date) {
        const expenseDate = moment(new Date(latestStandingOrderExpense.date));
        if (expenseDate.isAfter(moment(), "day")) {
          expenseAmountForCalculation = latestStandingOrderExpense.amount ?? 0;
        }
      }
    }

    return (
      currentBalance + incomeAmountForCalculation - expenseAmountForCalculation
    );
  };

  const handleFutureBalanceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    setDisplayedBalance(selectedValue);
  };

  return (
    <div className={styles.totalBalanceTile}>
      <h1 className={styles.balance}>£{totalBalance ?? 0}</h1>

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

        <h2 className={styles.value}>£{calculateFutureBalance().toFixed(2)}</h2>
      </div>

      <div className={styles.stats}>
        <h3 className={styles.title}>Incoming changes</h3>
        <div className={styles.income}>
          <div className={styles.label}>
            <FaLongArrowAltUp />
            <p>Income</p>
          </div>
          {latestStandingOrderIncome ? (
            <div className={styles.incomeDetails}>
              <span>{latestStandingOrderIncome.date}</span>
              <span>{latestStandingOrderIncome.name}</span>
              <span>{latestStandingOrderIncome.amount}£</span>
            </div>
          ) : (
            <div className={styles.incomeDetails}>
              <span>No planned income this month</span>
            </div>
          )}
        </div>
        <div className={styles.expense}>
          <div className={styles.label}>
            <FaLongArrowAltDown />
            <p>Expense</p>
          </div>
          {latestStandingOrderExpense ? (
            <div className={styles.incomeDetails}>
              <span>{latestStandingOrderExpense.date}</span>
              <span>{latestStandingOrderExpense.name}</span>
              <span>{latestStandingOrderExpense.amount}£</span>
            </div>
          ) : (
            <div className={styles.incomeDetails}>
              <span>No planned expenses this month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalBalanceTile;
