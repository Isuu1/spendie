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
    <>
      {accounts.map((account) => (
        <div key={account.account_id} className={styles.account}>
          <h4>{account.name}</h4>
          <p>Balance: {account.balances.current}</p>
          <p>{account.type}</p>
          {/* <p>Cards</p> */}
          <div className={styles.cards}>
            {/* {account.cards.map((card) => (
              <div key={card.id} className={styles.cardWrapper}>
                <div className={styles.cardOverlay}></div>
                <div className={styles.card}>
                  <div className={styles.type}>
                    <p>{card.card_type}</p>
                    <PiContactlessPaymentFill className={styles.icon} />
                  </div>
                  <div className={styles.details}>
                    <p>{card.card_number}</p>
                    <p>{card.expiration_date}</p>
                  </div>
                </div>
                <div>
                  <IoTrashBin />
                </div>
              </div>
            ))} */}
          </div>
        </div>
      ))}
    </>
  );
};

export default AccountsTile;
