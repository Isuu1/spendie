import { Account } from "../../types/account";

interface Institution {
  accounts?: Account[];
}

export function getAccountsCountByStatus(grouped: Institution[] = []) {
  const counts = grouped.reduce(
    (acc, institution) => {
      // Use optional chaining and nullish coalescing to avoid crashes
      (institution?.accounts ?? []).forEach((account: Account) => {
        if (account.is_disconnected) {
          acc.disconnected += 1;
        } else if (account.is_hidden) {
          acc.hidden += 1;
        } else {
          acc.active += 1;
        }
      });
      return acc;
    },
    { active: 0, hidden: 0, disconnected: 0 },
  );

  //Add the total by summing the values
  return {
    ...counts,
    all: counts.active + counts.hidden,
  };
}
