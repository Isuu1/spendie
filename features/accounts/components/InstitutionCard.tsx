//Types
import { Account } from "../types/account";
import { Institution } from "../types/institution";
//Components
import AccountItem from "./AccountItem";
import Button from "@/shared/components/ui/Button";
import SyncIcon from "@/shared/components/SyncIcon";
//Utils
import { lastUpdated } from "../lib/utils/calculateLastSyncTime";
import { formatAmount } from "@/shared/lib/utils/formatAmount";
import { useState } from "react";
import ConfirmAction from "@/shared/components/ConfirmAction";
import { useRemovePlaidItem } from "@/shared/plaid/hooks/useRemovePlaidItem";

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
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate, isError } = useRemovePlaidItem();

  const handleDelete = async () => {
    mutate(institution.plaid_item_db_id);
    if (isError) return;
    setConfirmDelete(false);
  };

  const handleSync = async () => {
    onSync(institution.plaid_item_id);
  };

  const { totals } = institution;

  const totalBalance = formatAmount(
    totals.total,
    institution.accounts[0]?.currency,
  ).displayAmount;

  const hiddenBalance = formatAmount(
    totals.hidden,
    institution.accounts[0]?.currency,
  ).displayAmount;

  if (institution.accounts.length === 0) return null;

  return (
    <div className="relative bg-background p-4 rounded-2xl flex flex-col gap-4">
      <Button
        variant="destructive"
        className="self-end"
        onClick={() => setConfirmDelete(true)}
      >
        Remove bank
      </Button>
      <div className="flex justify-between items-center">
        <h3>{institution.institution_name}</h3>
        {activeSegment !== "disconnected" && (
          <div className="flex gap-2 items-center">
            <SyncIcon isSyncing={isSyncing} />
            <p>{lastUpdated(institution.last_synced_at)}</p>
            <Button
              variant="secondary"
              size="sm"
              iconPosition="left"
              onClick={handleSync}
              disabled={isSyncing}
              className="disabled:cursor-not-allowed"
            >
              {isSyncing ? "Syncing..." : "Sync now"}
            </Button>
          </div>
        )}
      </div>
      <>
        <h3>Total balance: {totalBalance}</h3>
        <p className="text-text-secondary!">Hidden: {hiddenBalance}</p>
      </>
      {/* {activeSegment !== "disconnected" && (
        <div className="flex gap-2 items-center">
          <SyncIcon isSyncing={isSyncing} />
          <p>{lastUpdated(institution.last_synced_at)}</p>
          <Button
            variant="secondary"
            size="sm"
            iconPosition="left"
            onClick={handleSync}
            disabled={isSyncing}
            className="disabled:opacity-50! disabled:cursor-not-allowed!"
          >
            {isSyncing ? "Syncing..." : "Sync now"}
          </Button>
        </div>
      )} */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-4">
        {institution.accounts.map((acc: Account) => (
          <AccountItem key={acc.id} account={acc} canEdit />
        ))}
      </div>
      {confirmDelete && (
        <ConfirmAction
          title="Are you sure you want to remove this bank?"
          subtitle="This action will remove all associated accounts and transactions. This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
};

export default InstitutionCard;
