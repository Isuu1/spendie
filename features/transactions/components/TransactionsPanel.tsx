import React from "react";
import Image from "next/image";
//Styles
import styles from "./TransactionsPanel.module.scss";
//Utils
import {
  displayTransactionAmount,
  displayTransactionCategory,
} from "../lib/utils";
//Hooks
import { useTransactions } from "../hooks/useTransactions";
//Types

//Components
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
import { Transaction } from "../types/transaction";

const TransactionsPanel: React.FC = () => {
  const { isLoading, data: transactions } = useTransactions();

  if (isLoading) {
    return <DashboardPanelLoader height={467} />;
  }

  return (
    <div className={styles.transactionsPanel}>
      <div className={styles.header}>
        <h3>Transactions</h3>
      </div>
      {transactions?.length === 0 && (
        <p className={styles.noTransactions}>No recent transactions found.</p>
      )}

      {transactions?.slice(0, 6).map((transaction: Transaction) => (
        <div
          key={transaction.transaction_id}
          className={styles.transactionItem}
        >
          <Image
            src={transaction?.image_url || "/images/transaction-icon.svg"}
            alt="transaction-image"
            width={45}
            height={45}
            className={styles.transactionImage}
          />

          <div className={styles.transactionDescription}>
            <p className={styles.name}>{transaction.name ?? "Unknown"}</p>
            <p className={styles.category}>
              {displayTransactionCategory(
                transaction?.category ?? "Uncategorized",
              )}
            </p>
          </div>

          <div className={styles.transactionDetails}>
            <p
              className={`${styles.transactionAmount} ${transaction.amount > 0 ? styles.expense : styles.income}`}
            >
              {displayTransactionAmount(
                transaction.amount,
                transaction.iso_currency_code,
              )}
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

export default TransactionsPanel;
