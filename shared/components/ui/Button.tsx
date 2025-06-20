"use client";

import React from "react";

//Styles
import styles from "./Button.module.scss";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "small" | "medium" | "large";
  type: "button" | "submit";
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () =>
    | void
    | ((e: React.MouseEvent<HTMLButtonElement>) => void)
    | Promise<void>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  variant,
  size,
  type,
  iconPosition,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${iconPosition ? styles[iconPosition] : ""} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text && text}
      {icon && <i className={styles.icon}>{icon}</i>}
    </button>
  );
};

export default Button;
