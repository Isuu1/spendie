import React from "react";

//Styles
import styles from "./Form.module.scss";

interface FormProps {
  children: React.ReactNode;
  action?: (string | ((formData: FormData) => void)) | undefined;
  layout: "horizontal" | "vertical";
  ref?: React.Ref<HTMLFormElement>;
  onSubmit?:
    | ((e: React.FormEvent) => void)
    | ((e: React.FormEvent<HTMLFormElement>) => void);
}

const Form: React.FC<FormProps> = ({
  children,
  action,
  layout,
  ref,
  onSubmit,
}) => {
  return (
    <form
      action={action}
      className={`${styles.formContainer} ${styles[layout]}`}
      ref={ref}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
