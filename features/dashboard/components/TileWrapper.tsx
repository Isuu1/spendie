import React from "react";

//Styles
import styles from "./TileWrapper.module.scss";
//Animations
import { motion } from "motion/react";

interface TileWrapperProps {
  name: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const TileWrapper: React.FC<TileWrapperProps> = ({ name, icon, children }) => {
  return (
    <motion.div className={styles.tile}>
      <div className={styles.title}>
        <span className={styles.icon}>{icon}</span>
        <p>{name}</p>
      </div>

      <div>{children}</div>
    </motion.div>
  );
};

export default TileWrapper;
