import { Account } from "./account";

export type Institution = {
  plaid_item_db_id: string;
  user_id: string;
  institution_name: string;
  institution_logo?: string;
  accounts: Account[];
  last_synced_at: string;
  totalBalances: {
    active: number;
    hidden: number;
  };
  status: "connected" | "needs_reauth" | "revoked" | "disconnected";
};
