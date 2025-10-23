"use client";

import React from "react";
//Styles
import styles from "./Input.module.scss";
//Components
import InputError from "@/shared/components/InputError";

interface InputProps {
  id: string;
  type: "text" | "number" | "email" | "password";
  label?: string;
  layout?: "horizontal" | "vertical";
  errors?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | void;
  defaultValue?: string | number;
  value?: string | number | Date;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  layout = "horizontal",
  errors,
  onChange,
  defaultValue,
  value,
  icon,
}) => {
  return (
    <>
      <div className={`${styles.inputContainer} ${styles[layout]}`}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={styles.fieldWrapper}>
          <div className={`${styles.inputFieldWrapper} `}>
            <input
              className={`${styles.inputField} ${icon ? styles.withIcon : ""}`}
              id={id}
              name={id}
              type={type}
              onChange={onChange}
              defaultValue={defaultValue}
              value={
                value instanceof Date ? value.toISOString().slice(0, 10) : value
              }
            />
            {icon && <span className={styles.icon}>{icon}</span>}
          </div>
          {errors && errors.length > 0 && (
            <div className={styles.errorContainer}>
              <InputError errors={errors} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
