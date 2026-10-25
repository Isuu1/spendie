export type Transaction = {
  id: string;
  transaction_id: string;
  account_id: string;
  user_id: string;
  amount: number;
  iso_currency_code: string;
  date: Date;
  name: string;
  original_name?: string;
  merchant_name?: string;
  category: string | null;
  pending: boolean;
  accounts?: {
    id: string;
    name: string;
    user_account_name?: string;
    plaid_items?: {
      institution_name: string;
    };
  };
};
