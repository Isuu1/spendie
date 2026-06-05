import React from "react";
import Image from "next/image";
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
import dayjs from "dayjs";
import { cn } from "@/shared/lib/cn";

const TransactionsPanel = () => {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) {
    return <DashboardPanelLoader height={467} />;
  }

  return (
    <div
      //className={styles.transactionsPanel}
      className="flex flex-col gap-2 w-full"
    >
      <div>
        <h4>Recent transactions</h4>
      </div>
      {transactions?.length === 0 && <p>No recent transactions found.</p>}

      {transactions?.slice(0, 6).map((transaction: Transaction) => (
        <div
          key={transaction.transaction_id}
          //className={styles.transactionItem}
          className="grid grid-cols-[auto_1fr_1fr] items-center px-1 rounded-md"
        >
          <Image
            src={transaction?.image_url || "/images/transaction-icon.svg"}
            alt="transaction-image"
            width={45}
            height={45}
            //className={styles.transactionImage}
            className="mr-2"
          />

          <div
            //className={styles.transactionDescription}
            className="flex flex-col items-start gap-1 mr-auto"
          >
            <p
              //className={styles.name}
              className="font-bold"
            >
              {transaction.name ?? "Unknown"}
            </p>
            <p
              //className={styles.category}
              className="text-sm text-secondary"
            >
              {displayTransactionCategory(
                transaction?.category ?? "Uncategorized",
              )}
            </p>
          </div>

          <div
            //className={styles.transactionDetails}
            className="flex flex-col items-end gap-1"
          >
            <p
              //className={`${styles.transactionAmount} ${transaction.amount > 0 ? styles.expense : styles.income}`}
              className={cn(
                "font-semibold",
                transaction.amount > 0 ? "text-red-500" : "text-green-500",
              )}
            >
              {displayTransactionAmount(
                transaction.amount,
                transaction.iso_currency_code,
              )}
            </p>
            <p
              //className={styles.date}
              className="text-secondary"
            >
              {dayjs(transaction.date).format("D MMMM YYYY")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsPanel;
