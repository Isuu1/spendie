"use client";

import React from "react";

//Styles
import styles from "./Input.module.scss";

interface InputProps {
  id: string;
  type: "text" | "number" | "email" | "password" | "select" | "date";
  label?: string;
  layout: "horizontal" | "vertical";
  selectOptions?: string[];
  errors?: string[] | null;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  defaultValue?: string | number;
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
          <input
            className={`${styles.inputField} ${errors ? styles.inputError : ""}`}
            id={id}
            name={id}
            type={type}
            onChange={onChange}
            defaultValue={defaultValue}
          />
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
      {errors && (
        <div className={styles.errorContainer}>
          {errors.map((err, index) => (
            <span key={index} className={styles.errorMessage}>
              {err}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Input;
