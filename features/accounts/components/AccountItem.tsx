import React, { useEffect, useState } from "react";
import { cn } from "@/shared/lib/cn";
//Utils
import { generateAccountBackground } from "../lib/utils/generateAccountBackground";
//Types
import { Account } from "@/features/accounts/types/account";
//Icons
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { MdEditDocument } from "react-icons/md";
//Hooks
import { useRenameAccount } from "../hooks/useRenameAccount";
//Components
import AccountItemMenu from "./AccountItemMenu";
//Hooks
import { useDisconnectAccount } from "../hooks/useDisconnectAccount";
import { useHideAccount } from "../hooks/useHideAccount";

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

  const { mutateAsync: disconnectAccount } = useDisconnectAccount();

  const { mutateAsync: hideAccount } = useHideAccount();

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

  //Don't render hidden accounts on dashboard view
  if (account.is_hidden && !canEdit) {
    return null;
  }

  return (
    <div
      className="z-1 relative grid grid-rows-2 overflow-hidden flex-[0_0_70%] rounded-md p-4"
      style={{
        background: generateAccountBackground(account.subtype ?? ""),
      }}
    >
      {account.is_hidden && canEdit && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-10 text-lg">
          Hidden
        </div>
      )}

      <BsCreditCard2FrontFill size={30} className="absolute bottom-2 right-3" />

      {isEditing ? (
        <input
          value={value}
          type="text"
          autoFocus
          className="self-start border-0 outline-0 font-bold text-base"
          onChange={(e) => setValue(e.target.value)}
          onBlur={cancelEditing}
          onKeyDown={handleKeyDown}
          disabled={isPending}
        />
      ) : (
        <h4
          className={cn(
            "group relative w-fit font-bold text-base",
            canEdit && "cursor-pointer",
          )}
          onClick={canEdit ? startEditing : undefined}
        >
          <MdEditDocument
            size={16}
            className="hidden! absolute -right-5 top-1 group-hover:block!"
          />
          {displayName}
        </h4>
      )}

      <div className="flex flex-col gap-3">
        <div className="z-1 relative flex flex-col gap-1 capitalize">
          <p>{account.subtype}</p>
          <p>**** **** **** {account.mask}</p>
        </div>

        <h3>
          {account.currency} {(account.current_balance ?? 0).toFixed(2)}
        </h3>
      </div>

      <div
        className={cn(
          "absolute top-0 left-37.5 bottom-62.5 right-62.5",
          "h-125 w-125 rounded-full bg-transparent",
          "border-40 border-white/10 box-border",
          "after:content-['*'] after:absolute after:h-150 after:w-150",
          "after:rounded-full after:bg-transparent",
          "after:border-20 after:border-white/10",
          "after:-bottom-20 after:-right-27.5 after:box-border",
        )}
      ></div>

      {canEdit && (
        <AccountItemMenu
          onRename={() => setIsEditing(true)}
          onDisconnect={() => disconnectAccount(account.id)}
          onHide={() => hideAccount(account.id)}
          isHidden={account.is_hidden}
          isDisconnected={account.is_disconnected}
        />
      )}
    </div>
  );
};

export default AccountItem;
