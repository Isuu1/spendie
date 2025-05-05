import React from "react";
import { useAccounts } from "@/shared/providers/AccountsProvider";
//Styles
import styles from "./TotalBalanceTile.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useTransactions } from "@/shared/providers/TransactionsProvider";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { transactionsExpense, transactionsIncome } from "../lib/utils";
import ChartLabel from "@/shared/components/ChartLabel";

const TotalBalanceTile = () => {
  const { accounts } = useAccounts();
  const { transactions } = useTransactions();

  const incomeValue = transactionsIncome(transactions ?? []);
  const expenseValue = transactionsExpense(transactions ?? []);

  const totalBalance = accounts?.reduce((sum, currentAccount) => {
    const currentBalance = currentAccount.balances.current ?? 0;
    return sum + currentBalance;
  }, 0);

  const summaryChartData = [
    { name: "Income", value: incomeValue },
    { name: "Expense", value: Math.abs(expenseValue) },
  ];

  if (!accounts) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.totalBalanceTile}>
      <ul className={styles.menu}>
        <li className={`${styles.item} ${styles.active}`}>Summary</li>
        <li className={styles.item}>Income</li>
        <li className={styles.item}>Expense</li>
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
            {incomeValue}
          </strong>
          <strong className={styles.expense}>
            <i className={styles.icon}>
              <FaLongArrowAltDown />
            </i>
            {expenseValue}
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
