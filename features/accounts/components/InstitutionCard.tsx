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
  totals: {
    active: number;
    hidden: number;
    disconnected: number;
    total: number;
  };
};

type InstitutionCardProps = {
  institution: Institution;
  onSync: (itemId: string) => void;
  isSyncing: boolean;
  activeSegment: string;
};

const InstitutionCard = ({
  institution,
  onSync,
  isSyncing,
  activeSegment,
}: InstitutionCardProps) => {
  const handleSync = async () => {
    onSync(institution.plaid_item_id);
  };

  const { totals } = institution;

  if (institution.accounts.length === 0) return null;

  return (
    <div key={institution.plaid_item_id} className={styles.accountGroup}>
      <h4>{institution.institution_name}</h4>
      {activeSegment === "disconnected" ? (
        <p className={styles.disconnectedBalance}>
          Disconnected balance: {institution.accounts[0]?.currency}{" "}
          {totals.disconnected.toFixed(2)}
        </p>
      ) : (
        <>
          <p className={styles.totalBalance}>
            Total balance: {institution.accounts[0]?.currency}{" "}
            {totals.total.toFixed(2)}
          </p>
          <p className={styles.hiddenBalance}>
            Hidden: {institution.accounts[0]?.currency}{" "}
            {totals.hidden.toFixed(2)}
          </p>
        </>
      )}
      {activeSegment !== "disconnected" && (
        <div className={styles.syncInfo}>
          <SyncIcon isSyncing={isSyncing} />
          <p>{lastUpdated(institution.last_synced_at)}</p>
          <Button
            variant="tertiary"
            size="small"
            iconPosition="left"
            onClick={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? "Syncing..." : "Sync now"}
          </Button>
        </div>
      )}
      <div className={styles.accountsContainer}>
        {institution.accounts.map((acc: Account) => (
          <AccountItem key={acc.id} account={acc} canEdit />
        ))}
      </div>
    </div>
  );
};

export default InstitutionCard;
