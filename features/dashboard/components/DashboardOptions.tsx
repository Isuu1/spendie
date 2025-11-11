"use client";

import React from "react";
//styles
import styles from "./DashboardOptions.module.scss";
import Button from "@/shared/components/ui/Button";
//Icons
import { MdSpaceDashboard } from "react-icons/md";
import DashboardPanelsMenu from "./DashboardPanelsMenu";
import { AnimatePresence } from "motion/react";

const DashboardOptions = () => {
  const [openPanelsMenu, setOpenPanelsMenu] = React.useState(false);

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
      <Button
        className={styles.panelsButton}
        text="Sort panels"
        variant="secondary"
        size="medium"
        icon={<MdSpaceDashboard />}
        iconPosition="left"
        //onClick={() => setOpenPanelsMenu(!openPanelsMenu)}
      />
      <AnimatePresence>
        {openPanelsMenu && (
          <DashboardPanelsMenu onClose={() => setOpenPanelsMenu(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardOptions;
