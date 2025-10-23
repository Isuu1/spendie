import React from "react";
import moment from "moment";
//Animations
import { motion } from "motion/react";
//Styles
import styles from "./CustomDatePicker.module.scss";
//DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  onChange?: (option: string) => void;
  onClose?: () => void;
  value?: string;
}

const datePickerVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: { duration: 0.2 },
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onChange,
  onClose,
  value,
}) => {
  return (
    <motion.div
      className={styles.datePickerWrapper}
      variants={datePickerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={(date) => {
          if (date) {
            onChange?.(date.toISOString());
          }
        }}
        inline
        calendarClassName={styles.datePicker}
        minDate={moment().toDate()}
        onSelect={() => {
          onClose?.();
        }}
      />
    </motion.div>
  );
};

export default CustomDatePicker;
