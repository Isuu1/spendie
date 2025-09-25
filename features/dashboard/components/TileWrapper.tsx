"use client";

import React from "react";
//Styles
import styles from "./TileWrapper.module.scss";
//Icons
import { TiThMenu } from "react-icons/ti";

interface TileWrapperProps {
  name: string;
  children: React.ReactNode;
}

const TileWrapper: React.FC<TileWrapperProps> = ({ name, children }) => {
  return (
    <div className={styles.tile}>
      <div className={styles.header}>
        <h3>{name}</h3>
        <span className={styles.tileMenu}>
          <TiThMenu className={styles.icon} />
        </span>
      </div>
      <>{children}</>
    </div>
  );
};

export default TileWrapper;
