import React from "react";
//Styles
import styles from "./Switcher.module.scss";
import clsx from "clsx";
//Animations
import { motion } from "motion/react";

interface SwitcherProps {
  value: boolean;
  onChange: () => void;
  label?: string;
  labelPosition?: "left" | "right";
  isPending?: boolean;
}

const Switcher: React.FC<SwitcherProps> = ({
  value,
  onChange,
  label,
  labelPosition = "right",
  isPending = false,
}) => {
  return (
    <div
      className={clsx(styles.switcher, {
        [styles.labelLeft]: labelPosition === "left",
        [styles.labelRight]: labelPosition === "right",
      })}
    >
      <span
        className={clsx(styles.panelStatus, [
          { [styles.pending]: isPending },
          { [styles.active]: !value },
          { [styles.inactive]: value },
        ])}
        onClick={() => onChange()}
      >
        <motion.span
          className={styles.indicator}
          initial={false}
          animate={{
            x: value ? "0%" : "100%",
          }}
        />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};

export default Switcher;
