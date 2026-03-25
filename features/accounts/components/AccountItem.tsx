import React, { useEffect, useState } from "react";
import clsx from "clsx";
//Styles
import styles from "./AccountItem.module.scss";
//Utils
import { generateAccountBackground } from "../lib/utils/generateAccountBackground";
//Types
import { Account } from "@/features/accounts/types/account";
//Icons
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";
import { MdEditDocument } from "react-icons/md";
//Hooks
import { useRenameAccount } from "../hooks/useRenameAccount";

type AccountItemProps = {
  account: Account;
  canEdit?: boolean;
};

const AccountItem = ({ account, canEdit }: AccountItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(
    account.user_account_name ?? account.name,
  );

  const { mutateAsync: renameAccount, isPending } = useRenameAccount();

  const displayName = account.user_account_name ?? account.name;

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setValue(account.user_account_name ?? account.name);
  };

  const save = async () => {
    //Remove leading/trailing whitespace and check if the name is empty
    const trimmed = value.trim();
    if (!trimmed) return cancelEditing();
    await renameAccount({ accountId: account.id, userName: trimmed });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") cancelEditing();
  };

  //Sync local state with db
  useEffect(() => {
    setValue(account.user_account_name ?? account.name);
  }, [account.user_account_name, account.name]);

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
          disabled={isPending}
        />
      ) : (
        <h4
          className={clsx(styles.name, canEdit && styles.editable)}
          onClick={canEdit ? startEditing : undefined}
        >
          <MdEditDocument className={styles.editIcon} />
          {displayName}
        </h4>
      )}
      <div className={styles.details}>
        <p className={styles.type}>{account.subtype}</p>
        <p>**** **** **** {account.mask}</p>
      </div>

      <h3 className={styles.balance}>
        {account.currency} {(account.current_balance ?? 0).toFixed(2)}
      </h3>

      <div className={styles.shape}></div>

      {canEdit && <IoMdMore className={styles.menuIcon} />}
    </div>
  );
};

export default AccountItem;
