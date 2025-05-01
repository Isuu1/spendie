import React from "react";

//Styles
import styles from "./TransactionsTile.module.scss";
import { useTransactions } from "@/shared/providers/TransactionsProvider";

const TransactionsTile: React.FC = () => {
  const { transactions } = useTransactions();

  const displayTransactionAmount = (amount: number) => {
    return amount > 0
      ? amount.toLocaleString("en-US", {
          style: "currency",
          currency: "GBP",
        })
      : `${Math.abs(amount).toLocaleString("en-US", {
          style: "currency",
          currency: "GBP",
        })}`;
  };

  if (!transactions) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul className={styles.transactionsHeader}>
        <li className={styles.transactionHeaderItem}>Date</li>
        <li className={styles.transactionHeaderItem}>Description</li>
        <li className={styles.transactionHeaderItem}>Amount</li>
      </ul>
      {transactions.map((transaction) => (
        <div key={transaction.id} className={styles.transactionItem}>
          <p>{transaction.date}</p>
          <p>{transaction.category}</p>
          <p
            className={transaction.amount > 0 ? styles.income : styles.expense}
          >
            {displayTransactionAmount(transaction.amount)}
          </p>
        </div>
      ))}
    </>
  );
};

export default TransactionsTile;
