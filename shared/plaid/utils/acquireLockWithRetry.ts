import { acquirePlaidItemSyncLock } from "../api/plaidItemSyncLock";

export async function acquireLockWithRetry(
  plaidItemDbId: string,
  maxAttempts = 3,
  delayMs = 1000,
): Promise<boolean> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const acquired = await acquirePlaidItemSyncLock(plaidItemDbId);

    if (acquired) {
      return true;
    }

    if (attempt < maxAttempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return false;
}
