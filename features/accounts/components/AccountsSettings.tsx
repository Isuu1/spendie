"use client";

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
import { lastUpdated } from "../lib/utils/calculateLastSyncTime";
import { usePlaidItems } from "../hooks/usePlaidItems";
import { useMemo } from "react";

const AccountsSettings = () => {
  const { data: accounts = [] } = useAccounts();
  const { data: items } = usePlaidItems();

  console.log("Plaid items in AccountsSettings:", items);

  const grouped = useMemo(() => {
    if (!accounts || !items) return [];

    return items.map((item) => ({
      ...item,
      accounts: accounts.filter(
        (acc: Account) =>
          acc.plaid_item_id === item.plaid_item_id && !acc.is_deleted,
      ),
    }));
  }, [accounts, items]);

  console.log("Grouped items with accounts:", grouped);

  return (
    <div className={styles.accountsSettings}>
      <h3>Linked accounts</h3>
      <div className={styles.accountsContainer}>
        {accounts.map((account: Account) => (
          <div className={styles.itemWrapper} key={account.id}>
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
