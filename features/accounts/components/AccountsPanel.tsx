import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
//Components
import DashboardAccountsList from "./DashboardAccountsList";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
import AccountsListButtons from "./DashboardAccountsListButtons";
//Hooks
import { useAccounts } from "../hooks/useAccounts";

const AccountsPanel = () => {
  const { data: accounts = [], isLoading } = useAccounts();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  if (isLoading) {
    return <DashboardPanelLoader height={215} />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h4 className="text-secondary">Accounts</h4>
        {accounts.length > 0 && (
          <AccountsListButtons emblaApi={emblaApi || null} />
        )}
      </div>

      <DashboardAccountsList accounts={accounts || []} emblaRef={emblaRef} />
      {accounts.length > 0 && (
        <Link className="transition-all hover:text-primary!" href="/accounts">
          Manage accounts
        </Link>
      )}
    </div>
  );
};

export default AccountsPanel;
