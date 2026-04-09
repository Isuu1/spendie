import { useMemo } from "react";
import { useAccounts } from "./useAccounts";
import { usePlaidItems } from "./usePlaidItems";
import { Account } from "../types/account";

export function useGroupedAccounts() {
  const { data: accounts = [] } = useAccounts();
  const { data: plaidItems = [] } = usePlaidItems();

  function calculateInstitutionTotals(accounts: Account[]) {
    let active = 0;
    let hidden = 0;
    let disconnected = 0;

    for (const acc of accounts) {
      if (acc.is_disconnected) {
        disconnected += acc.current_balance || 0;
        continue;
      }
      if (acc.is_hidden) {
        hidden += acc.current_balance || 0;
      } else {
        active += acc.current_balance || 0;
      }
    }
    return {
      active,
      hidden,
      disconnected,
      total: active + hidden,
    };
  }

  const data = useMemo(() => {
    return plaidItems
      .map((institution) => {
        const institutionAccounts = accounts
          .filter(
            (acc: Account) => acc.plaid_item_id === institution.plaid_item_id,
          )
          .sort(
            (a: Account, b: Account) =>
              (a.current_balance || 0) - (b.current_balance || 0),
          );

        const totals = calculateInstitutionTotals(institutionAccounts);

        return {
          ...institution,
          accounts: institutionAccounts,
          totals,
        };
      })
      .filter((institution) => institution.accounts.length > 0);
  }, [accounts, plaidItems]);

  return { data };
}
