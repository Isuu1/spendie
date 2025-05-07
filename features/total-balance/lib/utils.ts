import { Transaction } from "@/shared/types/transaction";

export const getTransactionsByDateRange = (
  startDate: Date,
  endDate: Date,
  transactions: Transaction[]
) => {
  if (!transactions) {
    return [];
  }
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

export const getIncomeTransactionsFromDate = (transactions: Transaction[]) => {
  if (!transactions) {
    return []; // Handle null case
  }
  const transactionsByIncome = getTransactionsByDateRange(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    new Date(),
    transactions
  ).filter((transaction) => transaction.amount < 0);
  return transactionsByIncome;
};

export const getExpenseTransactionsFromDate = (transactions: Transaction[]) => {
  const transactionsByExpense = getTransactionsByDateRange(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    new Date(),
    transactions
  ).filter((transaction) => transaction.amount > 0);
  return transactionsByExpense;
};
