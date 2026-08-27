import { useMemo } from "react";
import { useAccounts } from "./useAccounts";
import { usePlaidItems } from "@/shared/plaid/hooks/usePlaidItems";
import { Account } from "../types/account";

export function useGroupedAccounts() {
  const { data: accounts = [] } = useAccounts();
  const { data: plaidItems = [] } = usePlaidItems();

  const data = useMemo(() => {
    return plaidItems
      .map((institution) => {
        const institutionAccounts = accounts
          .filter((acc: Account) => acc.plaid_item_db_id === institution.id)
          .sort(
            (a: Account, b: Account) =>
              (a.current_balance || 0) - (b.current_balance || 0),
          );

        //Calculate total balances for the institution
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
          plaid_item_db_id: institution.id,
          institution_name: institution.institution_name,
          last_synced_at: institution.last_synced_at,
          accounts: institutionAccounts,
          totalBalances: { active, hidden },
        };
      })
      .filter((institution) => institution.accounts.length > 0);
  }, [accounts, plaidItems]);

  return { data };
}
