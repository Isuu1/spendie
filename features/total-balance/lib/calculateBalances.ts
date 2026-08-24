import { Account } from "@/features/accounts/types/account";

export function calculateBalances(accounts: Account[]) {
  let active = 0;
  let hidden = 0;

  for (const acc of accounts) {
    if (acc.is_hidden) {
      hidden += acc.current_balance || 0;
      continue;
    } else {
      active += acc.current_balance || 0;
    }
  }

  return {
    active,
    hidden,
  };
}
