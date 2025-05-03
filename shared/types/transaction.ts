export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  TRANSFER = "transfer", // Could involve two transactions (one out, one in)
  PAYMENT = "payment", // e.g., credit card payment
  INCOME = "income",
  EXPENSE = "expense",
  FEE = "fee",
}

export type Transaction = {
  transaction_id: string;
  date: string;
  amount: number;
  category: string[] | null;
  transaction_type?: string | undefined;
  logo_url?: string | null | undefined;
};
