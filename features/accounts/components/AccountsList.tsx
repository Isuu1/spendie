"use client";
import React from "react";
//Styles
import styles from "./AccountsList.module.scss";
//Utils
import { generateAccountBackground } from "../utils/generateAccountBackground";
//Types
import { Account } from "@/features/accounts/types/account";
import { EmblaViewportRefType } from "embla-carousel-react";
//Hooks
import { useUserClient } from "@/features/user/hooks/useUserClient";
//Components
import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";
//Icons
import { BsCreditCard2FrontFill } from "react-icons/bs";

interface AccountsListProps {
  accounts: Account[];
  emblaRef: EmblaViewportRefType;
}

const AccountsList: React.FC<AccountsListProps> = ({ accounts, emblaRef }) => {
  const { data: user, error } = useUserClient();

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
    <div ref={emblaRef} className={styles.emblaContainer}>
      <div className={styles.accounts}>
        {accounts.map((account) => (
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
            <div className={styles.details}>
              <h4 className={styles.name}>{account.official_name}</h4>
              <p className={styles.type}>{account.subtype}</p>
              <p>**** **** **** {account.mask}</p>
            </div>
            <p className={styles.balance}>
              <span>£{account.balances.current}</span>
            </p>

            <div className={styles.shape}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountsList;
