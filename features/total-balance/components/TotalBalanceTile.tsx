import React, { useState } from "react";
import { useAccounts } from "@/shared/providers/AccountsProvider";
//Styles
import styles from "./TotalBalanceTile.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useTransactions } from "@/shared/providers/TransactionsProvider";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  getExpenseTransactionsFromDate,
  getIncomeTransactionsFromDate,
} from "../lib/utils";
import ChartLabel from "@/shared/components/ChartLabel";

const TotalBalanceTile = () => {
  const { accounts } = useAccounts();
  const { transactions } = useTransactions();

  const [activeTab, setActiveTab] = useState("summary");

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

  const expenseSummary = () => {
    const summary = getExpenseTransactionsFromDate(transactions).reduce(
      (sum, currentTransaction) => {
        const currentAmount = currentTransaction.amount ?? 0;
        return sum + currentAmount;
      },
      0
    );
    return parseFloat(summary.toFixed(2));
  };

  const totalBalance = accounts?.reduce((sum, currentAccount) => {
    const currentBalance = currentAccount.balances.current ?? 0;
    return sum + currentBalance;
  }, 0);

  const summaryChartData = [
    { name: "Income", value: incomeSummary() },
    { name: "Expense", value: Math.abs(expenseSummary()) },
  ];

  // const incomeChartData = getIncomeTransactionsFromDate(transactions).map(
  //   (transaction) => {
  //     return {
  //       name: transaction.category,
  //       value: Math.abs(transaction.amount),
  //     };
  //   }
  // );

  return (
    <div className={styles.totalBalanceTile}>
      <ul className={styles.menu}>
        <li
          className={`${styles.item} ${activeTab === "summary" ? styles.active : ""}`}
          onClick={() => setActiveTab("summary")}
        >
          Summary
        </li>
        <li
          className={`${styles.item} ${activeTab === "income" ? styles.active : ""}`}
          onClick={() => setActiveTab("income")}
        >
          Income
        </li>
        <li
          className={`${styles.item} ${activeTab === "expense" ? styles.active : ""}`}
          onClick={() => setActiveTab("expense")}
        >
          Expense
        </li>
      </ul>
      <div className={styles.range}>This month</div>
      <div className={styles.transactionsSummary}>
        <ResponsiveContainer width={"100%"} height={200}>
          <PieChart>
            <Pie
              data={summaryChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              labelLine={false}
              label={(props) => <ChartLabel {...props} />}
            >
              {summaryChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#41b300" : "#ff0000"}
                  stroke="none"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.numbers}>
          <strong className={styles.income}>
            <i className={styles.icon}>
              <FaLongArrowAltUp />
            </i>
            {incomeSummary()}
          </strong>
          <strong className={styles.expense}>
            <i className={styles.icon}>
              <FaLongArrowAltDown />
            </i>
            {expenseSummary()}
          </strong>
        </div>
      </div>

      <strong className={styles.totalBalance}>
        <span>Total</span> {totalBalance ?? 0}
      </strong>
      {/* {accounts.map((account) => (
        <div key={account.account_id}>
          <h4>{account.name}</h4>
          <p>Balance: {formatGBP(account.balances.current)}</p>
        </div>
      ))} */}
    </div>
  );
};

export default TotalBalanceTile;
