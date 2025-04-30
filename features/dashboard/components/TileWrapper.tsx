import React from "react";

//Styles
import styles from "./TileWrapper.module.scss";

interface TileWrapperProps {
  name: string;
  variant: "light" | "dark";
  children: React.ReactNode;
}

const TileWrapper: React.FC<TileWrapperProps> = ({
  name,
  variant,
  children,
}) => {
  return (
    <div className={`${styles.tile} ${styles[variant]}`}>
      <h3>{name}</h3>
      <div>{children}</div>
    </div>
  );
};

export default TileWrapper;
