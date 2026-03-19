import { useMemo } from "react";
import { useAccounts } from "./useAccounts";
import { usePlaidItems } from "./usePlaidItems";
import { Account } from "../types/account";

export function useGroupedAccounts() {
  const { data: accounts = [] } = useAccounts();
  const { data: plaidItems = [] } = usePlaidItems();

  const data = useMemo(() => {
    return plaidItems
      .map((item) => ({
        ...item,
        accounts: accounts.filter(
          (acc: Account) =>
            acc.plaid_item_id === item.plaid_item_id && !acc.is_deleted,
        ),
      }))
      .filter((item) => item.accounts.length > 0);
  }, [accounts, plaidItems]);

  return { data };
}
