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

export const transactionsIncome = (transactions: Transaction[]) => {
  if (!transactions) {
    return []; // Handle null case
  }
  const transactionsByIncome = getTransactionsByDateRange(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    new Date(),
    transactions
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

export const transactionsExpense = (transactions: Transaction[]) => {
  const transactionsByExpense = getTransactionsByDateRange(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    new Date(),
    transactions
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
