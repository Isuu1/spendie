"use client";

import React from "react";
import clsx from "clsx";
//Styles
import styles from "./NumberInput.module.scss";
//Components
import InputFieldWrapper from "../InputFieldWrapper";

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
    <InputFieldWrapper id={id} label={label} errors={errors}>
      <input
        className={clsx(styles.inputField, icon && styles.withIcon)}
        id={id}
        name={id}
        type="number"
        onChange={onChange}
        value={value instanceof Date ? value.toISOString().slice(0, 10) : value}
      />
      {icon && <span className={styles.icon}>{icon}</span>}
    </InputFieldWrapper>
  );
};

export default NumberInput;
