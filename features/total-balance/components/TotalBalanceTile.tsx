import React from "react";
import { useAccounts } from "@/shared/providers/AccountsProvider";
//Styles
import styles from "./TotalBalanceTile.module.scss";
//Icons
//import { FaMoneyBillWave } from "react-icons/fa";

import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useTransactions } from "@/shared/providers/TransactionsProvider";
//import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import {} from //getExpenseTransactionsFromDate,
//getIncomeTransactionsFromDate,
"../lib/utils";
import { useUser } from "@/shared/providers/UserProvider";
//import ChartLabel from "@/shared/components/ChartLabel";

const TotalBalanceTile = () => {
  const { accounts } = useAccounts();
  const { transactions } = useTransactions();
  const { user } = useUser();
  console.log("user", user);

  if (!accounts || !transactions) {
    return <p>Loading...</p>;
  }

  // const incomeSummary = () => {
  //   const summary = getIncomeTransactionsFromDate(transactions).reduce(
  //     (sum, currentTransaction) => {
  //       const currentAmount = currentTransaction.amount ?? 0;
  //       return sum + currentAmount;
  //     },
  //     0
  //   );
  //   return parseFloat(summary.toFixed(2));
  // };

  // const expenseSummary = () => {
  //   const summary = getExpenseTransactionsFromDate(transactions).reduce(
  //     (sum, currentTransaction) => {
  //       const currentAmount = currentTransaction.amount ?? 0;
  //       return sum + currentAmount;
  //     },
  //     0
  //   );
  //   return parseFloat(summary.toFixed(2));
  // };

  const totalBalance = accounts?.reduce((sum, currentAccount) => {
    const currentBalance = currentAccount.balances.current ?? 0;
    return sum + currentBalance;
  }, 0);

  // const generateRandomColor = () => {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  // const summaryChartData = [
  //   { name: "Income", value: Math.abs(incomeSummary()), fill: "#41b300" },
  //   { name: "Expense", value: Math.abs(expenseSummary()), fill: "#ff0000" },
  // ];

  // const incomeChartData = getIncomeTransactionsFromDate(transactions).map(
  //   (transaction) => {
  //     return {
  //       name: transaction?.category?.[0] ?? "Other",
  //       value: Math.abs(transaction.amount),
  //       fill: generateRandomColor(),
  //     };
  //   }
  // );

  // const expenseChartData = getExpenseTransactionsFromDate(transactions).map(
  //   (transaction) => {
  //     return {
  //       name: transaction?.category?.[0] ?? "Other",
  //       value: Math.abs(transaction.amount),
  //       fill: generateRandomColor(),
  //     };
  //   }
  // );

  // const displayedChart = () => {
  //   switch (activeTab) {
  //     case "summary":
  //       return summaryChartData;
  //     case "income":
  //       return incomeChartData;
  //     case "expense":
  //       return expenseChartData;
  //     default:
  //       return summaryChartData;
  //   }
  // };

  // const incomeByPercent = () => {
  //   const totalIncome = incomeSummary();
  //   const totalExpense = expenseSummary();
  //   const total = totalIncome + totalExpense;
  //   const percent = (totalIncome / total) * 100;
  //   return parseFloat(percent.toFixed(2));
  // }

  const getLatestStandingOrder = (type: string) => {
    const filteredByType = user?.standing_orders?.filter(
      (standingOrder) => standingOrder.type === type // Filter by type
    );
    if (!filteredByType || filteredByType.length === 0) {
      return null; // No standing orders of this type
    }

    const sortedStandingOrders = filteredByType.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    return sortedStandingOrders[0] ?? null;
  };

  const latestStandingOrderIncome = getLatestStandingOrder("income");
  console.log("latestStandingOrder", latestStandingOrderIncome);
  const latestStandingOrderExpense = getLatestStandingOrder("expense");

  const calculateFutureBalance = (
    currentBalance: number,
    standingOrderIncome: number,
    standingOrderExpense: number
  ) => {
    const futureBalance =
      currentBalance + standingOrderIncome - standingOrderExpense;
    return futureBalance;
  };

  return (
    <div className={styles.totalBalanceTile}>
      <h1 className={styles.balance}>£{totalBalance ?? 0}</h1>

      <div className={styles.futureBalance}>
        <div className={styles.range}>End of the month balance</div>
        <h2 className={styles.value}>
          £
          {calculateFutureBalance(
            totalBalance ?? 0,
            latestStandingOrderIncome?.amount ?? 0,
            latestStandingOrderExpense?.amount ?? 0
          ).toFixed(2)}
        </h2>
      </div>

      <div className={styles.stats}>
        <h3 className={styles.title}>What`s next</h3>
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
