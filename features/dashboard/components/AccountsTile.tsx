import React from "react";
//import { accounts } from "@/data/accounts";

//Styles
import styles from "./AccountsTile.module.scss";
import { useAccounts } from "@/shared/providers/AccountsProvider";

const AccountsTile = () => {
  const { accounts } = useAccounts();

  if (!accounts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {accounts.map((account) => (
        <div key={account.id} className={styles.account}>
          <h4>{account.name}</h4>
          <p>Balance: {account.total_balance}</p>
          <p>Type: {account.type}</p>
          <div className={styles.cards}>
            {account.cards.map((card) => (
              <div key={card.id} className={styles.card}>
                <p>{card.card_number}</p>
                <p>{card.expiration_date}</p>
                <p>{card.card_type}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default AccountsTile;
