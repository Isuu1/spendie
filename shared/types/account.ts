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
  account_id: string;
  name: string;
  balances: {
    current: number | null;
    available: number | null;
    limit?: number | null; // Optional for credit cards
    iso_currency_code: string | null;
  };
  type: string;
};
