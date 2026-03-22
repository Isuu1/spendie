import React from "react";
//Animation
import { motion } from "motion/react";
//Icons
import { FaSyncAlt } from "react-icons/fa";

type SyncIconProps = {
  isSyncing?: boolean;
};

const SyncIcon = ({ isSyncing = false }: SyncIconProps) => {
  return (
    <motion.span
      style={{ display: "inline-flex", fontSize: "1rem", color: "#b4b4b4" }}
      animate={isSyncing ? { rotate: 360 } : { rotate: 0 }}
      transition={
        isSyncing
          ? { ease: "linear", duration: 1, repeat: Infinity }
          : { duration: 0 } //Snap back to 0 instantly when done
      }
    >
      <FaSyncAlt />
    </motion.span>
  );
};

export default SyncIcon;
