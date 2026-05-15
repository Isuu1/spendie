import { Transaction } from "../../types/transaction";

export function getTransactionsInPeriod(
  transactions: Transaction[],
  from: Date,
  to: Date,
) {
  return transactions.filter((transaction) => {
    const date = new Date(transaction.date);

    return date >= from && date <= to;
  });
}
