import React from "react";

//Styles
import styles from "./Input.module.scss";

interface InputProps {
  id: string;
  type: "text" | "number" | "email" | "password" | "select" | "date";
  label?: string;
  layout: "horizontal" | "vertical";
  selectOptions?: string[];
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  layout,
  selectOptions,
}) => {
  return (
    <div className={`${styles.inputContainer} ${styles[layout]}`}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      {type !== "select" && (
        <input className={styles.inputField} id={id} name={id} type={type} />
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
  );
};

export default Input;
