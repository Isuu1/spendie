import React, { useState } from "react";
//Styles
import styles from "./AccountItem.module.scss";
//Utils
import { generateAccountBackground } from "../lib/utils/generateAccountBackground";
//Types
import { Account } from "@/features/accounts/types/account";
//Icons
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";

interface AccountItemProps {
  account: Account;
  onRename?: (accountId: string, newName: string) => void;
  showMenu?: boolean;
}

const AccountItem = ({ account, showMenu }: AccountItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const displayName = account.user_account_name ?? account.name;

  return (
    <div
      className={styles.account}
      style={{
        background: generateAccountBackground(account.subtype ?? ""),
      }}
    >
      <i className={styles.icon}>
        <BsCreditCard2FrontFill />
      </i>
      {isEditing ? (
        <input type="text" className={styles.nameInput} />
      ) : (
        <h4 className={styles.name} onClick={() => setIsEditing(true)}>
          {displayName}
        </h4>
      )}
      <div className={styles.details}>
        <p className={styles.type}>{account.subtype}</p>
        <p>**** **** **** {account.mask}</p>
      </div>

      <h3 className={styles.balance}>
        {account.currency} {account.current_balance?.toFixed(2)}
      </h3>

      <div className={styles.shape}></div>

      {showMenu && <IoMdMore className={styles.menuIcon} />}
    </div>
  );
};

export default AccountItem;
