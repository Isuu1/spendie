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
          .filter((acc: Account) => acc.status === "active")
          .sort(
            (a: Account, b: Account) =>
              (a.current_balance || 0) - (b.current_balance || 0),
          );

        //Calculate total balances for the institution
        const totalBalances = institutionAccounts.reduce(
          (totals: { active: number; hidden: number }, acc: Account) => {
            const balance = acc.current_balance || 0;

            if (acc.is_hidden) {
              totals.hidden += balance;
            } else {
              totals.active += balance;
            }

            return totals;
          },
          { active: 0, hidden: 0 },
        );

        return {
          plaid_item_db_id: institution.id,
          user_id: institution.user_id,
          institution_name: institution.institution_name,
          last_synced_at: institution.last_synced_at,
          accounts: institutionAccounts,
          totalBalances: totalBalances,
          status: institution.status,
        };
      })
      .filter((institution) => institution.accounts.length > 0);
  }, [accounts, plaidItems]);

  return { data };
}
