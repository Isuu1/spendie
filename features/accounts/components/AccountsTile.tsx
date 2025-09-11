import React from "react";

//Styles
import styles from "./AccountsTile.module.scss";
//Api
import { getAccountsServer } from "@/features/accounts/api/server";
//Types
import { Account } from "@/shared/types/account";
import AccountsList from "./AccountsList";

const AccountsTile = async () => {
  const accounts: Account[] = (await getAccountsServer()) ?? [];

  console.log("Accounts:", accounts);

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
    // <div className={styles.accountsTile}>
    //   {accounts.map((account) => (
    //     <div key={account.account_id} className={styles.account}>
    //       <div className={styles.details}>
    //         <h4>{account.official_name}</h4>
    //         <p className={styles.type}>{account.subtype}</p>
    //         <p>**** **** **** {account.mask}</p>
    //       </div>
    //       {/* <em className={styles.number}>****** {account.mask}</em> */}
    //       <p className={styles.balance}>
    //         <span>{account.balances.iso_currency_code}</span>
    //         <span>{account.balances.current}</span>
    //       </p>
    //       {/* <div className={styles.bgcover}></div> */}
    //     </div>
    //   ))}
    // </div>
    <div className={styles.accountsTile}>
      <AccountsList accounts={accounts} />
    </div>
  );
};

export default AccountsTile;
