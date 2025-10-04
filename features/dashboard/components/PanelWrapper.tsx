"use client";

import React from "react";
//Styles
import styles from "./PanelWrapper.module.scss";
//Icons
import { TiThMenu } from "react-icons/ti";

interface PanelWrapperProps {
  name: string;
  children: React.ReactNode;
}

const PanelWrapper: React.FC<PanelWrapperProps> = ({ name, children }) => {
  return (
    <div className={styles.panelWrapper}>
      <div className={styles.header}>
        <h3>{name}</h3>
        <span className={styles.panelMenu}>
          <TiThMenu className={styles.icon} />
        </span>
      </div>
      <>{children}</>
    </div>
  );
};

export default PanelWrapper;
