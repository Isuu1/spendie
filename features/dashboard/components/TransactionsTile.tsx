import React from "react";
import Image from "next/image";

//Styles
import styles from "./TransactionsTile.module.scss";
//Api
import { getTransactionsServer } from "@/features/transactions/api/server";

const TransactionsTile: React.FC = async () => {
  const transactions = await getTransactionsServer();

  console.log("transactions", transactions);
  // Function to format the transaction amount
  const displayTransactionAmount = (amount: number) => {
    return amount > 0
      ? `+${amount.toLocaleString("en-US", {
          style: "currency",
          currency: "GBP",
        })}`
      : `-${Math.abs(amount).toLocaleString("en-US", {
          style: "currency",
          currency: "GBP",
        })}`;
  };

  const displayCategory = (category: string | null) => {
    if (!category || category.length === 0) {
      return "Uncategorized";
    }
    const newCategory = category.replace(/_/g, " ").toLowerCase();
    return newCategory;
  };

  if (!transactions) {
    return <div>No transactions found.</div>;
  }

  return (
    <div className={styles.transactionsTile}>
      {transactions.slice(0, 6).map((transaction) => (
        <div
          key={transaction.transaction_id}
          className={styles.transactionItem}
        >
          <Image
            src={
              transaction?.personal_finance_category_icon_url ||
              "/images/transaction-icon.svg"
            }
            alt="transaction-image"
            width={45}
            height={45}
            className={styles.transactionImage}
          />

          <div className={styles.transactionDescription}>
            <p className={styles.name}>{transaction.name ?? "Unknown"}</p>
            <p className={styles.category}>
              {displayCategory(transaction?.personal_finance_category.primary)}
            </p>
          </div>

          <div className={styles.transactionDetails}>
            <p
              className={`${styles.transactionAmount} ${transaction.amount < 0 ? styles.expense : styles.income}`}
            >
              {displayTransactionAmount(transaction.amount)}
            </p>
            <p className={styles.date}>
              {new Date(transaction.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsTile;
