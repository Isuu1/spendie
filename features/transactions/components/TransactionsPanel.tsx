import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
//Hooks
import { useTransactions } from "../hooks/useTransactions";
//Types
import { Transaction } from "../types/transaction";
//Components
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";

const TransactionsPanel = () => {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) {
    return <DashboardPanelLoader height={467} />;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div>
        <h4>Recent transactions</h4>
      </div>
      {transactions?.length === 0 && <p>No recent transactions found.</p>}

      {transactions?.slice(0, 6).map((transaction: Transaction) => (
        <div
          key={transaction.transaction_id}
          className="grid grid-cols-[auto_1fr_1fr] items-center px-1 rounded-md"
        >
          <Image
            src={transaction?.image_url || "/images/transaction-icon.svg"}
            alt="transaction-image"
            width={45}
            height={45}
            className="mr-2"
          />

          <div className="flex flex-col items-start gap-1 mr-auto">
            <p className="font-bold">{transaction.name ?? "Unknown"}</p>
            <p className="text-sm text-secondary">
              {transaction?.category?.replace(/_/g, " ") ?? "Uncategorized"}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <p
              className={
                transaction.amount > 0 ? "text-red-500" : "text-green-500"
              }
            >
              {Math.abs(transaction.amount)} {transaction.iso_currency_code}
            </p>
            <p className="text-secondary">
              {dayjs(transaction.date).format("D MMMM YYYY")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsPanel;
