import React from "react";
//import { accounts } from "@/data/accounts";

//Styles
import styles from "./AccountsTile.module.scss";
import { useAccounts } from "@/shared/providers/AccountsProvider";
//Icons
// import { PiContactlessPaymentFill } from "react-icons/pi";
// import { IoTrashBin } from "react-icons/io5";

const AccountsTile = () => {
  const { accounts } = useAccounts();

  if (!accounts) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.accountsTile}>
      {accounts.map((account) => (
        <div key={account.account_id} className={styles.account}>
          <div className={styles.type}>
            <h4>{account.name}</h4>
            <p>{account.type}</p>
          </div>
          <em className={styles.number}>****** {account.mask}</em>
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
