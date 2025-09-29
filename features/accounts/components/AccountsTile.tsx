import React from "react";

//Styles
import styles from "./AccountsTile.module.scss";
//Api
import { getAccountsServer } from "@/features/accounts/api/server";
//Types
import { Account } from "@/shared/types/account";
//Components
import AccountsList from "./AccountsList";

const AccountsTile = async () => {
  const accounts: Account[] = (await getAccountsServer()) ?? [];

  if (accounts.length === 0) {
    return (
      <div className={styles.accountsTile}>
        <p>No accounts found. Please link your bank account.</p>
        <p>
          You can link your bank account by going to the settings page and
          selecting `Link Bank Account`.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.accountsTile}>
      <AccountsList accounts={accounts} />
    </div>
  );
};

export default AccountsTile;
