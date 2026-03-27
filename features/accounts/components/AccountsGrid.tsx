"use client";

//Styles
import styles from "./AccountsGrid.module.scss";
//Hooks
import { useSyncAccount } from "../hooks/useSyncAccount";
import { useGroupedAccounts } from "../hooks/useGroupedAccounts";
//Components
import InstitutionCard from "./InstitutionCard";
import { useState } from "react";
import Button from "@/shared/components/ui/Button";
import { Account } from "../types/account";

const AccountsGrid = () => {
  const [showHidden, setShowHidden] = useState(false);

  const { data: grouped = [] } = useGroupedAccounts();

  const { mutate: syncAccount, isPending, variables } = useSyncAccount();

  const hiddenAccountsCount = grouped.reduce((count, institution) => {
    return (
      count +
      institution.accounts.filter(
        (acc: Account) => acc.is_hidden && !acc.is_disconnected,
      ).length
    );
  }, 0);

  return (
    <div className={styles.accountsGrid}>
      <Button
        text={`${showHidden ? "Hide" : "Show"} hidden accounts (${hiddenAccountsCount})`}
        variant="tertiary"
        size="small"
        onClick={() => setShowHidden(!showHidden)}
      />
      {grouped.map((item) => (
        <InstitutionCard
          key={item.plaid_item_id}
          institution={item}
          onSync={() => syncAccount(item.plaid_item_id)}
          isSyncing={isPending && variables === item.plaid_item_id}
          showHidden={showHidden}
        />
      ))}
    </div>
  );
};

export default AccountsGrid;
