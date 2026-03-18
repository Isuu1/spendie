"use server";

import { syncPlaidAccountsForItem } from "../../api/syncPlaidAccountsForItem";

type SyncAccountParams = {
  userId: string;
  accessToken: string;
  itemId: string;
};

export async function syncAccountAction(params: SyncAccountParams) {
  return await syncPlaidAccountsForItem(params);
}
