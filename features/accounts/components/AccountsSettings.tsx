"use client";

import dayjs from "dayjs";
//Hooks
import { useAccounts } from "../hooks/useAccounts";
//Types
import { Account } from "../types/account";
//Components
import AccountItem from "./AccountItem";
//Styles
import styles from "./AccountsSettings.module.scss";
import Button from "@/shared/components/ui/Button";
//Icons
import { FaSyncAlt } from "react-icons/fa";

const AccountsSettings = () => {
  const { data = [] } = useAccounts();

  console.log("Accounts data:", data);

  const today = dayjs();

  const lastUpdated = (syncedDate: string | null) => {
    const lastSyncedAt = dayjs(syncedDate);

    const diffInDays = today.diff(lastSyncedAt, "day");

    if (diffInDays === 0) return "Last updated: Today";

    if (diffInDays === 1) return "Last updated: Yesterday";

    return `Last updated: ${diffInDays} days ago`;
  };

  return (
    <div className={styles.accountsSettings}>
      <h3>Linked accounts</h3>
      <div className={styles.accountsContainer}>
        {data.map((account: Account) => (
          <div className={styles.itemWrapper} key={account.account_id}>
            <div className={styles.syncInfo}>
              <p>{lastUpdated(account.last_synced_at)}</p>
              <Button
                variant="primary"
                size="small"
                text="Sync"
                icon={<FaSyncAlt />}
                iconPosition="left"
              />
            </div>
            {/* <div className={styles.buttons}>
              <Button variant="secondary" size="small" text="Rename" />
            </div> */}

            <AccountItem account={account} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountsSettings;
