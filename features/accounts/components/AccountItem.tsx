import React from "react";
//Styles
import styles from "./AccountItem.module.scss";
//Utils
import { generateAccountBackground } from "../lib/utils/generateAccountBackground";
//Types
import { Account } from "@/features/accounts/types/account";
//Icons
import { BsCreditCard2FrontFill } from "react-icons/bs";

interface AccountItemProps {
  account: Account;
}

const AccountItem = ({ account }: AccountItemProps) => {
  console.log("Rendering AccountItem for account:", account);
  return (
    <div
      key={account.account_id}
      className={styles.account}
      style={{
        background: generateAccountBackground(account.subtype ?? ""),
      }}
    >
      <i className={styles.icon}>
        <BsCreditCard2FrontFill />
      </i>
      <h4 className={styles.name}>{account.name}</h4>
      <div className={styles.details}>
        <p className={styles.type}>{account.subtype}</p>
        <p>**** **** **** {account.mask}</p>
      </div>

      <h3 className={styles.balance}>
        {account.currency} {account.current_balance?.toFixed(2)}
      </h3>

      <div className={styles.shape}></div>
    </div>
  );
};

export default AccountItem;
