"use client";

//Hooks
import { useAccounts } from "../hooks/useAccounts";
//Types
import { Account } from "../types/account";
//Components
import AccountItem from "./AccountItem";
//Styles
import styles from "./AccountsSettings.module.scss";

const AccountsSettings = () => {
  const { data = [] } = useAccounts();
  return (
    <div className={styles.accountsSettings}>
      <h3>Linked accounts</h3>
      <div className={styles.accountsContainer}>
        {data.map((account: Account) => (
          <AccountItem key={account.account_id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default AccountsSettings;
