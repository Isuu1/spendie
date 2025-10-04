export type Account = {
  account_id: string;
  name: string;
  balances: {
    current: number | null;
    available: number | null;
    limit?: number | null; // Optional for credit cards
    iso_currency_code: string | null;
  };
  official_name: string | null;
  subtype: string | null;
  type: string;
  mask: string | null;
};
