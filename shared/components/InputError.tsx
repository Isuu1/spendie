import { MdOutlineError } from "react-icons/md";
import styles from "./InputError.module.scss";

interface InputErrorProps {
  errors?: string[];
}

export default function InputError({ errors = [] }: InputErrorProps) {
  if (errors.length === 0) return null;

  return (
    <div className={styles.errorContainer}>
      {errors.map((err, index) => (
        <span key={index} className={styles.errorMessage}>
          <MdOutlineError className={styles.icon} />
          {err}
        </span>
      ))}
    </div>
  );
}
