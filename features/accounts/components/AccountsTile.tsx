import React from "react";

//Styles
import styles from "./AccountsTile.module.scss";
//Api
import { getAccountsServer } from "@/features/accounts/api/server";
//Types
import { Account } from "@/shared/types/account";

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
      {accounts.map((account) => (
        <div key={account.account_id} className={styles.account}>
          <div className={styles.type}>
            <h4>{account.name}</h4>
            <p>{account.type}</p>
          </div>
          {/* <em className={styles.number}>****** {account.mask}</em> */}
          <div className={styles.balance}>
            <p>Balance</p>
            <p>
              {account.balances.iso_currency_code} {account.balances.current}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountsTile;
