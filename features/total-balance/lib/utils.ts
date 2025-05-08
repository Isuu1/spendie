import { Transaction } from "@/shared/types/transaction";
import { UserProfile } from "@/shared/types/user";

export const getLatestStandingOrder = (type: string, user: UserProfile) => {
  const filteredByType = user?.standing_orders?.filter(
    (standingOrder) => standingOrder.type === type
  );
  if (!filteredByType || filteredByType.length === 0) {
    return null; //No standing orders of this type
  }

  const sortedStandingOrders = filteredByType.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  return sortedStandingOrders[0] ?? null;
};

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
