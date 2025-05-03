"use client";

//import { useAccounts } from "@/shared/providers/AccountsProvider";
import React from "react";

//Styles
import styles from "./CardsTile.module.scss";
//Icons
//import { PiContactlessPaymentFill } from "react-icons/pi";
//import { IoTrashBin } from "react-icons/io5";

const CardsTile = () => {
  //const { accounts } = useAccounts();

  // const userCards = accounts?.reduce<
  //   {
  //     accountId: string;
  //     id: number;
  //     card_number: string;
  //     expiration_date: string;
  //     card_type: string;
  //     balance: number;
  //   }[]
  // >((acc, account) => {
  //   const cards = account.cards.map((card) => ({
  //     ...card,
  //     accountId: account.id,
  //   }));
  //   return [...acc, ...cards];
  // }, []);

  // console.log("Cards in CardsTile:", userCards);

  // if (!accounts || !userCards) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <div className={styles.cards}>
        {/* {userCards.map((card) => (
          <div key={card.id} className={styles.cardWrapper}>
            <div className={styles.cardOverlay}></div>
            <div className={styles.card}>
              <div className={styles.type}>
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
  );
};

export default CardsTile;
