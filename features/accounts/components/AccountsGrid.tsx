"use client";

import React, { useMemo } from "react";
//Types
import { Account } from "../types/account";
//Components
import AccountItem from "./AccountItem";
import Button from "@/shared/components/ui/Button";
//Styles
import styles from "./AccountsGrid.module.scss";
//Utils
import { lastUpdated } from "../lib/utils/calculateLastSyncTime";

//Icons
import { FaSyncAlt } from "react-icons/fa";
//Hooks
import { useSyncAccount } from "../hooks/useSyncAccount";
import { usePlaidItems } from "../hooks/usePlaidItems";
import { useAccounts } from "../hooks/useAccounts";

const AccountsGrid = () => {
  const { data: accounts = [] } = useAccounts();
  const { data: plaidItems } = usePlaidItems();

  const { mutate: syncAccount, isPending } = useSyncAccount();

  console.log("Plaid items in AccountsGrid:", plaidItems);
  console.log("Accounts in AccountsGrid:", accounts);

  const grouped = useMemo(() => {
    if (!accounts || !plaidItems) return [];

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

  const handleSync = (itemId: string) => {
    syncAccount(itemId);
  };

  console.log("Grouped accounts by item:", grouped);

  return (
    <div className={styles.accountsGrid}>
      {grouped.map((item) => (
        <div key={item.plaid_item_id} className={styles.accountGroup}>
          <h4>{item.institution_name}</h4>
          <div className={styles.syncInfo}>
            <p>{lastUpdated(item.last_synced_at)}</p>
            <Button
              variant="primary"
              size="small"
              text={isPending ? "Syncing..." : "Sync now"}
              icon={<FaSyncAlt />}
              iconPosition="left"
              onClick={() => handleSync(item.plaid_item_id)}
              disabled={isPending}
            />
          </div>
          <div className={styles.accountsContainer}>
            {item.accounts.map((acc: Account) => (
              <AccountItem key={acc.id} account={acc} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountsGrid;
