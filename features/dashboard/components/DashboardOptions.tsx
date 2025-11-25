"use client";

import React from "react";
//styles
import styles from "./DashboardOptions.module.scss";
import Button from "@/shared/components/ui/Button";
//Icons
import { MdSpaceDashboard } from "react-icons/md";
import DashboardPanelsMenu from "./DashboardPanelsMenu";
import { AnimatePresence } from "motion/react";
import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";
import { useUserClient } from "@/features/user/hooks/useUserClient";
import PopUp from "@/shared/components/PopUp";

const DashboardOptions = () => {
  const [openPanelsMenu, setOpenPanelsMenu] = React.useState(false);

  const { data: user } = useUserClient();

  return (
    <div className={styles.dashboardOptions}>
      <Button
        className={styles.panelsButton}
        text="Manage panels"
        variant="secondary"
        size="medium"
        icon={<MdSpaceDashboard />}
        iconPosition="left"
        onClick={() => setOpenPanelsMenu(!openPanelsMenu)}
      />
      <PlaidLink userId={user?.id ?? ""} variant="secondary" />
      <AnimatePresence>
        {openPanelsMenu && (
          <PopUp>
            <DashboardPanelsMenu onClose={() => setOpenPanelsMenu(false)} />
          </PopUp>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardOptions;
