//Types
import { Account } from "../types/account";
//Components
import AccountItem from "./AccountItem";
import Button from "@/shared/components/ui/Button";
import SyncIcon from "@/shared/components/SyncIcon";
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
    <div
      key={institution.plaid_item_id}
      className="relative flex flex-col gap-4"
    >
      <h4>{institution.institution_name}</h4>
      {activeSegment === "disconnected" ? (
        <p className="text-text-secondary!">
          Disconnected balance: {institution.accounts[0]?.currency}{" "}
          {totals.disconnected.toFixed(2)}
        </p>
      ) : (
        <>
          <p className="font-bold">
            Total balance: {institution.accounts[0]?.currency}{" "}
            {totals.total.toFixed(2)}
          </p>
          <p className="text-text-secondary!">
            Hidden: {institution.accounts[0]?.currency}{" "}
            {totals.hidden.toFixed(2)}
          </p>
        </>
      )}
      {activeSegment !== "disconnected" && (
        <div className="flex gap-2 items-center">
          <SyncIcon isSyncing={isSyncing} />
          <p>{lastUpdated(institution.last_synced_at)}</p>
          <Button
            variant="secondary"
            size="xs"
            iconPosition="left"
            onClick={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? "Syncing..." : "Sync now"}
          </Button>
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-4">
        {institution.accounts.map((acc: Account) => (
          <AccountItem key={acc.id} account={acc} canEdit />
        ))}
      </div>
    </div>
  );
};

export default InstitutionCard;
