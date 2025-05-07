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
import {
  //getExpenseTransactionsFromDate,
  getIncomeTransactionsFromDate,
} from "../lib/utils";
//import ChartLabel from "@/shared/components/ChartLabel";

const TotalBalanceTile = () => {
  const { accounts } = useAccounts();
  const { transactions } = useTransactions();

  if (!accounts || !transactions) {
    return <p>Loading...</p>;
  }

  const incomeSummary = () => {
    const summary = getIncomeTransactionsFromDate(transactions).reduce(
      (sum, currentTransaction) => {
        const currentAmount = currentTransaction.amount ?? 0;
        return sum + currentAmount;
      },
      0
    );
    return parseFloat(summary.toFixed(2));
  };

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

  return (
    <div className={styles.totalBalanceTile}>
      <h1 className={styles.balance}>£{totalBalance ?? 0}</h1>

      <div className={styles.futureBalance}>
        <div className={styles.range}>By the end of month</div>
        <h2 className={styles.value}>£{Math.abs(incomeSummary())}</h2>
      </div>

      <div className={styles.stats}>
        <h3 className={styles.title}>What`s next</h3>
        <div className={styles.income}>
          <div className={styles.label}>
            <FaLongArrowAltUp />
            <p>Income</p>
          </div>

          <div className={styles.incomeDetails}>
            <span>30 Jun 2024</span>
            <span>Salary</span>
            <span>£300</span>
          </div>
        </div>
        <div className={styles.expense}>
          <div className={styles.label}>
            <FaLongArrowAltDown />
            <p>Expense</p>
          </div>

          <div className={styles.incomeDetails}>
            <span>25 Jun 2024</span>
            <span>Phone</span>
            <span>£55</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalBalanceTile;
