"use client";

import React from "react";

//Styles
import styles from "./Button.module.scss";

interface ButtonProps {
  variant: "primary" | "secondary";
  text?: string;
  icon?: React.ReactNode;
  iconPosition: "left" | "right";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  variant,
  iconPosition,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${iconPosition ? styles[iconPosition] : ""}`}
      onClick={() => {}}
    >
      {text && text}
      {icon && <i className={styles.icon}>{icon}</i>}
    </button>
  );
};

export default Button;
