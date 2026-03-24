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
import { useRenameAccount } from "../hooks/useRenameAccount";

interface AccountItemProps {
  account: Account;
  onRename?: (accountId: string, newName: string) => void;
  canEdit?: boolean;
}

const AccountItem = ({ account, canEdit }: AccountItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(
    account.user_account_name ?? account.name,
  );

  const { mutate: renameAccount } = useRenameAccount();

  const displayName = account.user_account_name ?? account.name;

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setValue(account.user_account_name ?? account.name);
  };

  const save = async () => {
    const trimmed = value.trim();
    if (!trimmed) return cancelEditing();

    renameAccount({ accountId: account.id, userName: trimmed });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") cancelEditing();
  };

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
        <input
          value={value}
          type="text"
          autoFocus
          className={styles.nameInput}
          onChange={(e) => setValue(e.target.value)}
          onBlur={cancelEditing}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h4
          className={styles.name}
          style={canEdit ? { cursor: "pointer" } : { cursor: "default" }}
          onClick={canEdit ? startEditing : undefined}
        >
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

      {canEdit && <IoMdMore className={styles.menuIcon} />}
    </div>
  );
};

export default AccountItem;
