import React from "react";

//Styles
import styles from "./TileWrapper.module.scss";
//Animations
import { motion } from "motion/react";

interface TileWrapperProps {
  name: string;
  children: React.ReactNode;
}

const TileWrapper: React.FC<TileWrapperProps> = ({ name, children }) => {
  return (
    <motion.div className={styles.tile}>
      <h3>{name}</h3>
      <div>{children}</div>
    </motion.div>
  );
};

export default TileWrapper;
