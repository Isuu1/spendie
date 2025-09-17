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
  selectOptions?: string[];
  errors?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | void;
  defaultValue?: string | number;
  value?: string | number;
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
            className={styles.inputField}
            id={id}
            name={id}
            type={type}
            onChange={onChange}
            defaultValue={defaultValue}
            value={value}
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
