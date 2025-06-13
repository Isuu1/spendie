"use client";

import React from "react";

//Styles
import styles from "./TransactionsTile.module.scss";
import { useTransactions } from "@/shared/providers/TransactionsProvider";
import Image from "next/image";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

const TransactionsTile: React.FC = () => {
  const { transactions } = useTransactions();

  console.log("transactions", transactions);
  // Function to format the transaction amount

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
    <div className={styles.transactionsTile}>
      <ul className={styles.transactionsHeader}>
        <li className={styles.transactionHeaderItem}>Name</li>
        <li className={styles.transactionHeaderItem}>Date</li>
        <li className={styles.transactionHeaderItem}>Amount</li>
      </ul>
      {transactions.slice(0, 10).map((transaction) => (
        <div
          key={transaction.transaction_id}
          className={styles.transactionItem}
        >
          <div className={styles.transactionDescription}>
            <Image
              src={transaction?.logo_url || "/images/transaction-icon.svg"}
              alt="transaction-image"
              width={40}
              height={40}
              className={styles.transactionImage}
            />
            <p className={styles.name}>
              {transaction.category?.[0] ?? "Unknown"}
            </p>
          </div>
          <p className={styles.date}>
            {new Date(transaction.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <div className={styles.transactionAmount}>
            <i className={styles.icon}>
              {transaction.amount < 0 ? (
                <FaLongArrowAltUp className={styles.income} />
              ) : (
                <FaLongArrowAltDown className={styles.expense} />
              )}
            </i>
            <p className={styles.amount}>
              {displayTransactionAmount(transaction.amount)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsTile;
