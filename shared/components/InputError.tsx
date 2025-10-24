//Icons
import { MdOutlineError } from "react-icons/md";
//Styles
import styles from "./InputError.module.scss";
//Animations
import { motion } from "motion/react";

interface InputErrorProps {
  errors?: string[];
}

export default function InputError({ errors = [] }: InputErrorProps) {
  if (errors.length === 0) return null;

  return (
    <motion.div
      className={styles.errorContainer}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {errors.map((err, index) => (
        <span key={index} className={styles.errorMessage}>
          <MdOutlineError className={styles.icon} />
          {err}
        </span>
      ))}
    </motion.div>
  );
}
