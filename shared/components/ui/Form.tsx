import React from "react";

//Styles
import styles from "./Form.module.scss";

interface FormProps {
  children: React.ReactNode;
  action?: (string | ((formData: FormData) => void)) | undefined;
  layout: "horizontal" | "vertical";
  ref: React.Ref<HTMLFormElement>;
}

const Form: React.FC<FormProps> = ({ children, action, layout, ref }) => {
  return (
    <form
      action={action}
      className={`${styles.formContainer} ${styles[layout]}`}
      ref={ref}
    >
      {children}
    </form>
  );
};

export default Form;
