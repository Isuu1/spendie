"use client";

import React from "react";
//Styles
import styles from "./NumberInput.module.scss";
//Components
import InputError from "@/shared/components/InputError";

interface NumberInputProps {
  id: string;
  label?: string;
  errors?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | void;
  value?: string | number | Date;
  icon?: React.ReactNode;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  errors,
  onChange,
  value,
  icon,
}) => {
  return (
    <>
      <div className={styles.inputContainer}>
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
              type="number"
              onChange={onChange}
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

export default NumberInput;
