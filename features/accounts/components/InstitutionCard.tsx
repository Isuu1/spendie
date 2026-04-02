//Types
import { Account } from "../types/account";
//Components
import AccountItem from "./AccountItem";
import Button from "@/shared/components/ui/Button";
import SyncIcon from "@/shared/components/SyncIcon";
//Styles
import styles from "./InstitutionCard.module.scss";
//Utils
import { lastUpdated } from "../lib/utils/calculateLastSyncTime";

type Institution = {
  plaid_item_id: string;
  institution_name: string;
  institution_logo?: string;
  accounts: Account[];
  last_synced_at: string;
};

type InstitutionCardProps = {
  institution: Institution;
  onSync: (itemId: string) => void;
  isSyncing: boolean;
};

const InstitutionCard = ({
  institution,
  onSync,
  isSyncing,
}: InstitutionCardProps) => {
  const handleSync = async () => {
    onSync(institution.plaid_item_id);
  };

  if (institution.accounts.length === 0) return null;

  return (
    <div key={institution.plaid_item_id} className={styles.accountGroup}>
      <h4>{institution.institution_name}</h4>
      <p>
        Total balance: {institution.accounts[0]?.currency}{" "}
        {institution.accounts
          .reduce((sum, acc) => sum + (acc?.current_balance || 0), 0)
          .toFixed(2)}
      </p>
      <div className={styles.syncInfo}>
        <SyncIcon isSyncing={isSyncing} />
        <p>{lastUpdated(institution.last_synced_at)}</p>
        <Button
          variant="tertiary"
          size="small"
          text={isSyncing ? "Syncing..." : "Sync now"}
          iconPosition="left"
          onClick={handleSync}
          disabled={isSyncing}
        />
      </div>
      <div className={styles.accountsContainer}>
        {institution.accounts.map((acc: Account) => (
          <AccountItem key={acc.id} account={acc} canEdit />
        ))}
      </div>
    </div>
  );
};

export default InstitutionCard;
