"use client";
import React from "react";
//Styles
import styles from "./AccountsList.module.scss";
//Types
import { Account } from "@/features/accounts/types/account";
import { EmblaViewportRefType } from "embla-carousel-react";
//Hooks
import { useUser } from "@/features/user/hooks/useUser";
//Components
import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";
import AccountItem from "./AccountItem";

interface AccountsListProps {
  accounts: Account[];
  emblaRef: EmblaViewportRefType;
}

const AccountsList: React.FC<AccountsListProps> = ({ accounts, emblaRef }) => {
  const { data: user, error } = useUser();

  if (error) {
    console.error("Error fetching user data:", error);
  }

  if (accounts.length === 0)
    return (
      <div className={styles.noAccounts}>
        <p>You don`t have any linked accounts yet.</p>
        <PlaidLink userId={user?.id ?? ""} />
      </div>
    );

  return (
    <div
      ref={accounts.length > 1 ? emblaRef : null}
      className={styles.emblaContainer}
    >
      <div className={styles.accounts}>
        {accounts.map((account) => (
          <AccountItem key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default AccountsList;
