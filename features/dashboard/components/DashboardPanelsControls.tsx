"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
//Styles
import styles from "./DashboardPanelsControls.module.scss";
import { toastStyle } from "@/shared/styles/toastStyle";
//Icons
import { MdSpaceDashboard } from "react-icons/md";
//Utils
import { togglePanelVisibility } from "../../user/actions/togglePanelVisibility";
//Types
import { UserSettings } from "@/features/user/types/user";
//Config
import { PanelName, panelsMetaData } from "../config/panelsMetaData";
//Animations
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";

const panelMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

interface DashboardPanelsControlsProps {
  settings: UserSettings;
}

const DashboardPanelsControls: React.FC<DashboardPanelsControlsProps> = ({
  settings,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [localVisiblePanels, setLocalVisiblePanels] = useState<string[]>(
    settings?.visible_panels ?? []
  );

  const panelMenuRef = useRef<HTMLUListElement>(null);

  const router = useRouter();

  const isPanelActive = (panelName: PanelName) => {
    return localVisiblePanels.includes(panelName);
  };

  const handleChange = async (panelName: PanelName, isActive: boolean) => {
    setLocalVisiblePanels((prev) =>
      isActive ? prev.filter((p) => p !== panelName) : [...prev, panelName]
    );
    const result = await togglePanelVisibility(panelName, isActive);
    if (!result.success) {
      console.error("Failed to toggle panel visibility");
      toast.error("Failed to update panel settings", toastStyle);
      return;
    }
    router.refresh();
  };

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       panelMenuRef.current &&
  //       !panelMenuRef.current.contains(event.target as Node)
  //     ) {
  //       setMenuOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [panelMenuRef]);

  return (
    <div className={styles.dashboardControls}>
      <i className={styles.panelsIcon} onClick={() => setMenuOpen(!menuOpen)}>
        <MdSpaceDashboard />
      </i>
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            ref={panelMenuRef}
            className={styles.menu}
            variants={panelMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {panelsMetaData.map((panel) => (
              <li key={panel.name}>
                <span
                  className={`${styles.panelStatus} ${
                    isPanelActive(panel.name) ? styles.active : styles.inactive
                  }`}
                  onClick={() =>
                    handleChange(panel.name, !!isPanelActive(panel.name))
                  }
                >
                  <motion.span
                    initial={false}
                    animate={{
                      x: isPanelActive(panel.name) ? "0%" : "100%",
                      backgroundColor: isPanelActive(panel.name)
                        ? "#b4b4b4"
                        : "#444444ff",
                    }}
                  />
                </span>
                {panel.name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPanelsControls;
