export enum AccountType {
  CHECKING = "checking",
  SAVINGS = "savings",
  CREDIT_CARD = "credit_card",
  LOAN = "loan",
  INVESTMENT = "investment",
  CASH = "cash",
  OTHER = "other",
}

export type Card = {
  id: number;
  card_number: string;
  expiration_date: string;
  card_type: string;
  balance: number;
};

export type Account = {
  id: string;
  name: string;
  total_balance: number;
  type: AccountType;
  cards: Card[];
};
