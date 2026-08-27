import { useState } from "react";
//Types
import { Account } from "../types/account";
import { Institution } from "../types/institution";
//Components
import AccountItem from "./AccountItem";
import Button from "@/shared/components/ui/Button";
import SyncIcon from "@/shared/components/SyncIcon";
import ConfirmAction from "@/shared/components/ConfirmAction";
//Utils
import { lastUpdated } from "../lib/utils/calculateLastSyncTime";
import { formatAmount } from "@/shared/lib/utils/formatAmount";
//Hooks
import { useRemovePlaidItem } from "@/shared/plaid/hooks/useRemovePlaidItem";
import { useSyncPlaidInstitution } from "@/shared/plaid/hooks/useSyncPlaidInstitution";
import { AnimatePresence } from "motion/react";

type InstitutionCardProps = {
  institution: Institution;
  activeSegment: string;
};

const InstitutionCard = ({
  institution,
  activeSegment,
}: InstitutionCardProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate: removePlaidItem, isError } = useRemovePlaidItem();

  const {
    mutate: syncAccount,
    isPending,
    variables,
  } = useSyncPlaidInstitution();

  const handleDelete = async () => {
    removePlaidItem(institution.plaid_item_db_id);
    if (isError) return;
    setConfirmDelete(false);
  };

  const handleSync = async () => {
    syncAccount(institution.plaid_item_db_id);
  };

  //Destructure total balances from useGroupedAccounts hook
  const {
    totalBalances: { active, hidden },
  } = institution;

  const totalBalance = formatAmount(
    active,
    institution.accounts[0]?.currency,
  ).displayAmount;

  const hiddenBalance = formatAmount(
    hidden,
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
            <SyncIcon isSyncing={isPending} />
            <p>{lastUpdated(institution.last_synced_at)}</p>
            <Button
              variant="secondary"
              size="sm"
              iconPosition="left"
              onClick={handleSync}
              disabled={isPending && variables === institution.plaid_item_db_id}
              className="disabled:cursor-not-allowed"
            >
              {isPending && variables === institution.plaid_item_db_id
                ? "Syncing..."
                : "Sync now"}
            </Button>
          </div>
        )}
      </div>
      <>
        <h3>Total balance: {totalBalance}</h3>
        <p className="text-text-secondary!">Hidden: {hiddenBalance}</p>
      </>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-4">
        {institution.accounts.map((acc: Account) => (
          <AccountItem key={acc.id} account={acc} canEdit />
        ))}
      </div>
      <AnimatePresence>
        {confirmDelete && (
          <ConfirmAction
            title="Are you sure you want to remove this bank?"
            subtitle="This action will remove all associated accounts and transactions. This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setConfirmDelete(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstitutionCard;
