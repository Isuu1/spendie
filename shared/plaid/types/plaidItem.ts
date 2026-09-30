export type PlaidItem = {
  id: number;
  user_id: string;
  plaid_item_id: string;
  created_at: Date;
  access_token: string;
  last_synced_at: Date;
  status: "connected" | "neeeds_reauth" | "disconnected" | "revoked";
  institution_name: string;
  plaid_cursor: string;
};
