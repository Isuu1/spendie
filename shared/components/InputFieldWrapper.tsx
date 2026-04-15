import React from "react";

//Styles
import styles from "./InputFieldWrapper.module.scss";
import InputError from "./InputError";
import clsx from "clsx";

type InputFieldWrapperProps = {
  id: string;
  label?: string;
  children: React.ReactNode;
  errors?: string[];
};

const InputFieldWrapper = ({
  id,
  label,
  children,
  errors,
}: InputFieldWrapperProps) => {
  return (
    <div className={clsx(styles.inputContainer, !label ? styles.noLabel : "")}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.fieldWrapper}>
        <div className={styles.fieldInnerWrapper}>{children}</div>
        {errors && errors.length > 0 && (
          <div className={styles.errorContainer}>
            <InputError errors={errors} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFieldWrapper;
