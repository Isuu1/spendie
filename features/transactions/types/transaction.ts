export type Transaction = {
  transaction_id: string;
  plaid_item_id: string;
  account_id: string;
  amount: number;
  iso_currency_code: string;
  date: Date;
  name: string;
  original_name?: string;
  merchant_name?: string;
  category: string | null;
  pending: boolean;
};
