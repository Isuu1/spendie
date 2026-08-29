"use client";

import { useMemo, useState } from "react";
//Hooks
import { useGroupedAccounts } from "../hooks/useGroupedAccounts";
//Components
import InstitutionCard from "./InstitutionCard";
import SegmentedControl from "@/shared/components/SegmentedControl";
//Types
import { Account } from "../types/account";
//Utils
import { getAccountsCountByStatus } from "../lib/utils/getAccountsCountByStatus";

const AccountsGrid = () => {
  const [activeSegment, setActiveSegment] = useState("all");

  const { data: grouped = [] } = useGroupedAccounts();

  const handleSegmentChange = (value: string) => {
    setActiveSegment(value);
  };

  const counts = useMemo(() => getAccountsCountByStatus(grouped), [grouped]);

  const filteredAccounts = useMemo(() => {
    const filters: Record<string, (acc: Account) => boolean> = {
      all: (acc: Account) => acc.is_hidden || !acc.is_hidden,
      hidden: (acc: Account) => acc.is_hidden,
      active: (acc: Account) => !acc.is_hidden,
    };

    const filterFn = filters[activeSegment] || filters.active;

    return (
      grouped
        .map((institution) => ({
          ...institution,
          accounts: institution.accounts.filter(filterFn),
        }))
        //Only include institutions that have accounts after filtering
        .filter((institution) => institution?.accounts.length > 0)
    );
  }, [activeSegment, grouped]);

  return (
    <div className="flex flex-col gap-8 mt-4">
      <SegmentedControl
        options={[
          { label: `All connected (${counts.all})`, value: "all" },
          { label: `Active (${counts.active})`, value: "active" },
          { label: `Hidden (${counts.hidden})`, value: "hidden" },
        ]}
        onChange={(value) => handleSegmentChange(value)}
      />
      {filteredAccounts.length > 0 ? (
        filteredAccounts?.map((item) => (
          <InstitutionCard key={item.plaid_item_db_id} institution={item} />
        ))
      ) : (
        <p>No accounts to display.</p>
      )}
    </div>
  );
};

export default AccountsGrid;
