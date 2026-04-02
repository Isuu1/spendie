"use client";

import { useMemo, useState } from "react";
//Styles
import styles from "./AccountsGrid.module.scss";
//Hooks
import { useSyncAccount } from "../hooks/useSyncAccount";
import { useGroupedAccounts } from "../hooks/useGroupedAccounts";
//Components
import InstitutionCard from "./InstitutionCard";
import SegmentedControl from "@/shared/components/SegmentedControl";
//Types
import { Account } from "../types/account";

const AccountsGrid = () => {
  const [activeSegment, setActiveSegment] = useState("all");

  const { data: grouped = [] } = useGroupedAccounts();

  const { mutate: syncAccount, isPending, variables } = useSyncAccount();

  const handleSegmentChange = (value: string) => {
    setActiveSegment(value);
  };

  const filteredAccounts = useMemo(() => {
    const filters: Record<string, (acc: Account) => boolean> = {
      all: (acc: Account) => !acc.is_disconnected,
      hidden: (acc: Account) => acc.is_hidden && !acc.is_disconnected,
      active: (acc: Account) => !acc.is_hidden && !acc.is_disconnected,
      disconnected: (acc: Account) => acc.is_disconnected,
    };

    const filterFn = filters[activeSegment] || filters.active;

    return grouped.map((institution) => ({
      ...institution,
      accounts: institution.accounts.filter(filterFn),
    }));
  }, [activeSegment, grouped]);

  return (
    <div className={styles.accountsGrid}>
      <SegmentedControl
        options={[
          { label: "All", value: "all" },
          { label: "Active", value: "active" },
          { label: "Hidden", value: "hidden" },
          { label: "Disconnected", value: "disconnected" },
        ]}
        onChange={(value) => handleSegmentChange(value)}
      />
      {filteredAccounts?.map((item) => (
        <InstitutionCard
          key={item.plaid_item_id}
          institution={item}
          onSync={() => syncAccount(item.plaid_item_id)}
          isSyncing={isPending && variables === item.plaid_item_id}
        />
      ))}
    </div>
  );
};

export default AccountsGrid;
