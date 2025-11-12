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
}

const Switcher: React.FC<SwitcherProps> = ({ value, onChange, label }) => {
  return (
    <div className={styles.switcher}>
      <span
        className={clsx(styles.panelStatus, [
          // { [styles.pending]: isPending },
          { [styles.active]: value },
          { [styles.inactive]: !value },
        ])}
        onClick={() => onChange()}
      >
        <motion.span
          className={styles.indicator}
          initial={false}
          animate={{
            x: !value ? "0%" : "100%",
          }}
        />
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default Switcher;
