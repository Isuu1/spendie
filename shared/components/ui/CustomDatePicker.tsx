import React, { useRef } from "react";
import moment from "moment";
//Animations
import { motion } from "motion/react";
//Styles
import styles from "./CustomDatePicker.module.scss";
//DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useClickOutside } from "@/shared/hooks/useClickOutside";

interface CustomDatePickerProps {
  onChange?: (option: string) => void;
  onClose?: () => void;
  value?: string | null;
  top?: number;
  left?: number;
  right?: number;
}

const datePickerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.1 },
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onChange,
  onClose,
  value,
  top,
  left,
  right,
}) => {
  const datePickerRef = useRef<HTMLDivElement>(null);

  useClickOutside(datePickerRef, () => onClose?.());

  console.log("Rendering CustomDatePicker with value:", value);

  return (
    <motion.div
      ref={datePickerRef}
      className={styles.datePickerWrapper}
      style={{ top: top, left: left, right: right }}
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
        formatWeekDay={(nameOfDay) => moment(nameOfDay, "dd").format("ddd")}
      />
    </motion.div>
  );
};

export default CustomDatePicker;
