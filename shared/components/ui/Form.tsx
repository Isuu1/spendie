import React from "react";

//Styles
import styles from "./Form.module.scss";

interface FormProps {
  children: React.ReactNode;
  action?: string | undefined | ((formData: FormData) => Promise<void>);
  layout: "horizontal" | "vertical";
}

const Form: React.FC<FormProps> = ({ children, action, layout }) => {
  return (
    <form
      action={action}
      className={`${styles.formContainer} ${styles[layout]}`}
    >
      {children}
    </form>
  );
};

export default Form;
