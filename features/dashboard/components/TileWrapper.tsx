import React from "react";

//Styles
import styles from "./TileWrapper.module.scss";
//Animations
import { motion } from "motion/react";
//Icons
import { TiThMenu } from "react-icons/ti";

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
        <h3>{name}</h3>
        <span className={styles.tileMenu}>
          <TiThMenu className={styles.icon} />
        </span>
      </div>

      <div>{children}</div>
    </motion.div>
  );
};

export default TileWrapper;
