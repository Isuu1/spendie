"use client";

import React from "react";
import clsx from "clsx";
//Styles
import styles from "./Input.module.scss";
//Components
import InputFieldWrapper from "../InputFieldWrapper";

interface InputProps {
  id: string;
  type: "text" | "number" | "email" | "password";
  label?: string;
  placeholder?: string;
  errors?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | void;
  defaultValue?: string | number;
  value?: string | number | Date;
  icon?: React.ReactNode;
  passwordIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  placeholder,
  errors,
  onChange,
  defaultValue,
  value,
  icon,
  passwordIcon,
}) => {
  return (
    <InputFieldWrapper id={id} label={label} errors={errors}>
      <input
        className={clsx(styles.inputField, icon && styles.withIcon)}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value instanceof Date ? value.toISOString().slice(0, 10) : value}
      />
      {icon && <span className={styles.icon}>{icon}</span>}
      {passwordIcon && (
        <i className={styles.showPasswordToggle}>{passwordIcon}</i>
      )}
    </InputFieldWrapper>
  );
};

export default Input;
