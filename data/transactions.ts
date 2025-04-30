export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  TRANSFER = "transfer", // Could involve two transactions (one out, one in)
  PAYMENT = "payment", // e.g., credit card payment
  INCOME = "income",
  EXPENSE = "expense",
  FEE = "fee",
}

export const transactions = [
  {
    id: 1,
    date: "2023-10-01",
    description: "Grocery Store",
    amount: -50.75,
    category: "Groceries",
    type: TransactionType.EXPENSE,
  },
];
