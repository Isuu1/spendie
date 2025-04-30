import { transactions } from "./transactions";

export enum AccountType {
  CHECKING = "checking",
  SAVINGS = "savings",
  CREDIT_CARD = "credit_card",
  LOAN = "loan",
  INVESTMENT = "investment",
  CASH = "cash",
  OTHER = "other",
}

export const accounts = [
  {
    id: 1,
    name: "Barclays",
    totalBalance: 1500.0,
    type: AccountType.CHECKING,
    transactions: transactions,
    cards: [
      {
        id: 1,
        cardNumber: "1234-5678-9012-3456",
        expirationDate: "12/25",
        cardType: "Visa",
        balance: 1500.0,
      },
    ],
  },
  {
    id: 2,
    name: "Revolut",
    totalBalance: 2500.0,
    type: AccountType.SAVINGS,
    transactions: transactions,
    cards: [
      {
        id: 2,
        cardNumber: "9876-5432-1098-7654",
        expirationDate: "11/24",
        cardType: "MasterCard",
        balance: 2500.0,
      },
    ],
  },
];
