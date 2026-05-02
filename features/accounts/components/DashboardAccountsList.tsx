"use client";
import React from "react";
//Types
import { Account } from "@/features/accounts/types/account";
import { EmblaViewportRefType } from "embla-carousel-react";
//Hooks
import { useUser } from "@/features/user/hooks/useUser";
//Components
import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";
import AccountItem from "./AccountItem";

interface DashboardAccountsListProps {
  accounts: Account[];
  emblaRef: EmblaViewportRefType;
}

const DashboardAccountsList: React.FC<DashboardAccountsListProps> = ({
  accounts,
  emblaRef,
}) => {
  const { data: user, error } = useUser();

  if (error) {
    console.error("Error fetching user data:", error);
  }

  if (accounts.length === 0)
    return (
      <div className="flex flex-col gap-2">
        <p>You don`t have any linked accounts yet.</p>
        <PlaidLink userId={user?.id ?? ""} />
      </div>
    );

  return (
    <div
      ref={accounts.length > 1 ? emblaRef : null}
      className="relative w-full mt-1 overflow-hidden"
    >
      <div className="flex gap-2 select-none">
        {accounts.map((account) => (
          <AccountItem key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default DashboardAccountsList;
