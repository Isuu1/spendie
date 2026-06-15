import { Account } from "./account";

export type Institution = {
  plaid_item_id: string;
  institution_name: string;
  institution_logo?: string;
  accounts: Account[];
  last_synced_at: string;
  totals: {
    active: number;
    hidden: number;
    disconnected: number;
    total: number;
  };
};
