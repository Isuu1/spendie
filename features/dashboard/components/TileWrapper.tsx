import React from "react";

//Styles
import styles from "./TileWrapper.module.scss";

interface TileWrapperProps {
  name: string;
  variant: "light" | "dark";
  children: React.ReactNode;
}

const TileWrapper: React.FC<TileWrapperProps> = ({
  name,
  variant,
  children,
}) => {
  return (
    <div className={`${styles.tile} ${styles[variant]}`}>
      <h3>{name}</h3>
      <div>
        {children}
        {/* 
        {type === "accounts" &&
          accounts.map((account) => (
            <div key={account.id} className={styles.account}>
              <h4>{account.name}</h4>
              <p>Balance: {account.balance}</p>
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
          ))} */}
      </div>
    </div>
  );
};

export default TileWrapper;
