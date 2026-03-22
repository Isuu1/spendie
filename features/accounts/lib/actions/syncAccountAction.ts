"use server";

import { getUserServer } from "@/features/user/api/getUserServer";
import { syncPlaidAccountsForItem } from "../../api/syncPlaidAccountsForItem";

export async function syncAccountAction(itemId: string) {
  const user = await getUserServer();

  if (!user) {
    throw new Error("User not authenticated");
  }

  //Use sync function to sync accounts for the specific item
  return await syncPlaidAccountsForItem({
    userId: user.id,
    itemId: itemId,
  });
}
