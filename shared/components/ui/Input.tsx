"use client";

import React from "react";

//Styles
import styles from "./Input.module.scss";

//Icons
import { MdOutlineError } from "react-icons/md";

interface InputProps {
  id: string;
  type: "text" | "number" | "email" | "password" | "select" | "date";
  label?: string;
  layout: "horizontal" | "vertical";
  selectOptions?: readonly string[];
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
  layout,
  selectOptions,
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
        {type !== "select" && (
          <div className={styles.inputFieldWrapper}>
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
        )}
        {type === "select" && (
          <select className={styles.selectField} id={id} name={id}>
            {selectOptions?.map((option, index) => (
              <option className={styles.option} key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
      {errors && errors.length > 0 && (
        <div className={styles.errorContainer}>
          {errors.map((err, index) => (
            <span key={index} className={styles.errorMessage}>
              <MdOutlineError className={styles.icon} />
              {err}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Input;
