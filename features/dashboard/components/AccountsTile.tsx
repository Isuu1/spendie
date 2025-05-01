import React from "react";
import { accounts } from "@/data/accounts";

//Styles
import styles from "./AccountsTile.module.scss";

const AccountsTile = () => {
  return (
    <>
      {accounts.map((account) => (
        <div key={account.id} className={styles.account}>
          <h4>{account.name}</h4>
          <p>Balance: {account.totalBalance}</p>
          <p>Type: {account.type}</p>
          <div className={styles.cards}>
            {account.cards.map((card) => (
              <div key={card.id} className={styles.card}>
                <p>{card.cardNumber}</p>
                <p>{card.expirationDate}</p>
                <p>{card.cardType}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default AccountsTile;
