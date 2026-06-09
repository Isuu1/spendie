"use client";

import React from "react";
import { useTransactions } from "../hooks/useTransactions";

const TransactionsGrid = () => {
  const { data: transactions, isLoading } = useTransactions();
  console.log(transactions, isLoading);
  return <div>Transactions Grid</div>;
};

export default TransactionsGrid;
