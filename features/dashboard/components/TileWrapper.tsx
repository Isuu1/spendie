import React from "react";

//Styles
import styles from "./TileWrapper.module.scss";

interface TileWrapperProps {
  name: string;
  children: React.ReactNode;
}

const TileWrapper: React.FC<TileWrapperProps> = ({ name, children }) => {
  return (
    <div className={styles.tile}>
      <h3>{name}</h3>
      <div>{children}</div>
    </div>
  );
};

export default TileWrapper;
