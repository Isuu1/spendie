"use client";

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
import { useGroupedAccounts } from "../hooks/useGroupedAccounts";

const AccountsGrid = () => {
  const { data: grouped = [] } = useGroupedAccounts();

  const sortedGrouped = grouped.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateA - dateB;
  });

  const { mutate: syncAccount, isPending, variables } = useSyncAccount();

  const handleSync = (itemId: string) => {
    syncAccount(itemId);
  };

  return (
    <div className={styles.accountsGrid}>
      {sortedGrouped.map((item) => (
        <div key={item.plaid_item_id} className={styles.accountGroup}>
          <h4>{item.institution_name}</h4>
          <div className={styles.syncInfo}>
            <p>{lastUpdated(item.last_synced_at)}</p>
            <Button
              variant="primary"
              size="small"
              text={
                isPending && variables === item.plaid_item_id
                  ? "Syncing..."
                  : "Sync now"
              }
              icon={<FaSyncAlt />}
              iconPosition="left"
              onClick={() => handleSync(item.plaid_item_id)}
              disabled={isPending && variables === item.plaid_item_id}
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
