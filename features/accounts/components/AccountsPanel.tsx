import React from "react";
//Components
import AccountsList from "./AccountsList";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
import AccountsListButtons from "./AccountsListButtons";
//Hooks
import { useAccountsClient } from "../hooks/useAccountsClient";
import useEmblaCarousel from "embla-carousel-react";

const AccountsPanel: React.FC = () => {
  const { data: accounts, isLoading } = useAccountsClient();
  const [emblaRef, emblaApi] = useEmblaCarousel();

  if (isLoading) {
    return <DashboardPanelLoader height={215} />;
  }

  return (
    <>
      <h3>Accounts</h3>
      <AccountsListButtons emblaApi={emblaApi || null} />
      <AccountsList accounts={accounts || []} emblaRef={emblaRef} />
    </>
  );
};

export default AccountsPanel;
