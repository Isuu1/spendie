import React from "react";
import { useAccounts } from "@/shared/providers/AccountsProvider";
//Styles
import styles from "./TotalBalanceTile.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useTransactions } from "@/shared/providers/TransactionsProvider";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const TotalBalanceTile = () => {
  const { accounts } = useAccounts();
  const { transactions } = useTransactions();

  const getTransactionsByDateRange = (startDate: Date, endDate: Date) => {
    if (!transactions) {
      return [];
    }
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  };

  const transactionsIncome = () => {
    const transactionsByIncome = getTransactionsByDateRange(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      new Date()
    ).filter((transaction) => transaction.amount > 0);
    const incomeSummary = transactionsByIncome.reduce(
      (sum, currentTransaction) => {
        const currentAmount = currentTransaction.amount ?? 0;
        return sum + currentAmount;
      },
      0
    );
    return parseFloat(incomeSummary.toFixed(2));
  };

  const transactionsExpense = () => {
    const transactionsByExpense = getTransactionsByDateRange(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      new Date()
    ).filter((transaction) => transaction.amount < 0);
    const expenseSummary = transactionsByExpense.reduce(
      (sum, currentTransaction) => {
        const currentAmount = currentTransaction.amount ?? 0;
        return sum + currentAmount;
      },
      0
    );
    return parseFloat(expenseSummary.toFixed(2));
  };

  const incomeValue = transactionsIncome();
  const expenseValue = transactionsExpense();

  console.log("Income transactions:", transactionsIncome());
  console.log("Expense transactions:", transactionsExpense());

  const summaryChartData = [
    { name: "Income", value: incomeValue },
    { name: "Expense", value: Math.abs(expenseValue) },
  ];

  const formatGBP = (amount: number | null): string => {
    if (amount === null) {
      return "£0.00"; // Handle null case
    }
    return amount.toLocaleString("en-GB", {
      // Use 'en-GB' for Great Britain Pound formatting
      style: "currency",
      currency: "GBP",
    });
  };

  // const renderCustomizedPercentageLabel = ({
  //   cx,
  //   cy,
  //   midAngle,
  //   innerRadius,
  //   outerRadius,
  //   percent,
  //   index,
  //   name,
  //   value,
  // }) => {
  //   const RADIAN = Math.PI / 180;
  //   const labelRadius = outerRadius + 25; // Increased radius slightly for background
  //   const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);
  //   const textAnchor = x > cx ? "start" : "end";
  //   const percentageValue = `${(percent * 100).toFixed(1)}%`;

  //   // --- Style Definitions ---
  //   let textFill = "#fff"; // Default text color (white)
  //   let backgroundFill = "#333"; // Default background color (dark grey)
  //   if (index === 0) {
  //     // Income
  //     backgroundFill = "#41b300"; // Green background
  //   } else if (index === 1) {
  //     // Expense
  //     backgroundFill = "#ff0000"; // Red background
  //   }

  //   // --- Background Rectangle Calculation (Approximate) ---
  //   const padding = 4;
  //   // Estimate text width (adjust multiplier as needed for your font)
  //   const textWidthEstimate = percentageValue.length * 7;
  //   const textHeightEstimate = 14; // Should roughly match font size + line height

  //   const rectX =
  //     textAnchor === "start"
  //       ? x // Start rect at text anchor
  //       : x - textWidthEstimate - 2 * padding; // Shift rect left for end anchor
  //   const rectY = y - textHeightEstimate / 2 - padding;
  //   const rectWidth = textWidthEstimate + 2 * padding;
  //   const rectHeight = textHeightEstimate + 2 * padding;

  //   // Optional: Hide small labels
  //   // if (percent < 0.05) {
  //   //   return null;
  //   // }

  //   // --- Return SVG Group with Rect and Text ---
  //   return (
  //     <g>
  //       {" "}
  //       {/* Group the rect and text */}
  //       {/* Background Rectangle */}
  //       <rect
  //         x={rectX}
  //         y={rectY}
  //         width={rectWidth}
  //         height={rectHeight}
  //         fill={backgroundFill} // Apply background color
  //         rx={5} // Rounded corners for the background
  //         opacity={0.8} // Optional: make background slightly transparent
  //       />
  //       {/* Label Text (rendered on top of the rect) */}
  //       <text
  //         x={textAnchor === "start" ? x + padding : x - padding} // Adjust text position for padding
  //         y={y} // Keep vertical alignment
  //         fill={textFill} // Apply text color
  //         fontSize={12}
  //         fontWeight="bold"
  //         textAnchor={textAnchor}
  //         dominantBaseline="central"
  //       >
  //         {percentageValue}
  //       </text>
  //     </g>
  //   );
  // };

  const totalBalance = accounts?.reduce((sum, currentAccount) => {
    const currentBalance = currentAccount.balances.current ?? 0;
    return sum + currentBalance;
  }, 0);

  if (!accounts) {
    return <p>Loading...</p>; // Handle loading state if needed
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
              //label={renderCustomizedPercentageLabel}
              label={{ fill: "#000", fontSize: 14 }}
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
            {transactionsIncome()}
          </strong>
          <strong className={styles.expense}>
            <i className={styles.icon}>
              <FaLongArrowAltDown />
            </i>
            {transactionsExpense()}
          </strong>
        </div>
      </div>

      <strong className={styles.totalBalance}>
        Total: {formatGBP(totalBalance ?? 0)}
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
