export type Transaction = {
  transaction_id: string;
  account_id: string;
  amount: number;
  iso_currency_code: string;
  date: Date;
  name: string;
  category: string | null;
  pending: boolean;
  image_url?: string;
};
