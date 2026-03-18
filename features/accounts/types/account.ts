export type Account = {
  account_id: string;
  plaid_item_id: string;
  name: string;
  current_balance: number | null;
  available_balance: number | null;
  currency: string | null;
  subtype: string | null;
  type: string;
  mask: string | null;
  last_synced_at: string | null;
  is_deleted: boolean;
  is_hidden: boolean;
};
