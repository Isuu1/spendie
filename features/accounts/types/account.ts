export type Account = {
  id: string;
  plaid_item_id: string;
  name: string;
  user_account_name: string | null;
  current_balance: number | null;
  available_balance: number | null;
  currency: string | null;
  subtype: string | null;
  type: string;
  mask: string | null;
  last_synced_at: string | null;
  is_disconnected: boolean;
  is_hidden: boolean;
};
