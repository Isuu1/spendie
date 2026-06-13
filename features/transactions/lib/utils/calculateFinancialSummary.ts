import { Transaction } from "../../types/transaction";

export function calculateFinancialSummary(transactions: Transaction[]) {
  console.log("Calculating financial summary for transactions:", transactions);
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0)
    .toFixed(2);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0)
    .toFixed(2);

  return {
    income,
    expenses,
  };
}
