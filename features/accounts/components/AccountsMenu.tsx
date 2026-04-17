"use client";

import { useUser } from "@/features/user/hooks/useUser";
//Styles
import styles from "./AccountsMenu.module.scss";
//Components
import Button from "@/shared/components/ui/Button";
import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";
//Icons
import { FaSyncAlt } from "react-icons/fa";

const AccountsMenu = () => {
  const { data } = useUser();

  if (!data) {
    return null; // or a loading state
  }

  return (
    <div className={styles.menu}>
      <Button
        variant="secondary"
        size="medium"
        icon={<FaSyncAlt />}
        iconPosition="left"
      >
        Sync all accounts
      </Button>
      <PlaidLink userId={data?.id} variant="secondary" />
    </div>
  );
};

export default AccountsMenu;
