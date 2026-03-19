"use client";

//Styles
import styles from "./AccountsGrid.module.scss";
//Hooks
import { useSyncAccount } from "../hooks/useSyncAccount";
import { useGroupedAccounts } from "../hooks/useGroupedAccounts";
//Components
import InstitutionCard from "./InstitutionCard";

const AccountsGrid = () => {
  const { data: grouped = [] } = useGroupedAccounts();

  const { mutate: syncAccount, isPending, variables } = useSyncAccount();

  const sortedGrouped = [...grouped].sort((a, b) => {
    return (
      new Date(b.last_synced_at).getTime() -
      new Date(a.last_synced_at).getTime()
    );
  });

  return (
    <div className={styles.accountsGrid}>
      {sortedGrouped.map((item) => (
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
