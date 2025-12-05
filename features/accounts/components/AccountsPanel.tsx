import React from "react";
//Components
import AccountsList from "./AccountsList";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
import AccountsListButtons from "./AccountsListButtons";
//Hooks
import { useAccountsClient } from "../hooks/useAccountsClient";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
//Styles
import styles from "./AccountsPanel.module.scss";

const AccountsPanel: React.FC = () => {
  const { data: accounts, isLoading } = useAccountsClient();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  if (isLoading) {
    return <DashboardPanelLoader height={215} />;
  }

  return (
    <div className={styles.accountsPanel}>
      <div className={styles.header}>
        <h3>Accounts</h3>
        <AccountsListButtons emblaApi={emblaApi || null} />
      </div>

      <AccountsList accounts={accounts || []} emblaRef={emblaRef} />
      <Link className={styles.manageAccounts} href="/user/accounts">
        Manage accounts
      </Link>
    </div>
  );
};

export default AccountsPanel;
