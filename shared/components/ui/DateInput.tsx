import React, { useState } from "react";
//Styles
import styles from "./DateInput.module.scss";
//Animations
import { AnimatePresence, motion } from "motion/react";
//Components
import CustomDatePicker from "../CustomDatepicker/CustomDatepicker";
//Icons
import { TbArrowBigDownLineFilled } from "react-icons/tb";
import dayjs from "dayjs";
import InputFieldWrapper from "../InputFieldWrapper";
import clsx from "clsx";

interface DateInputProps {
  id: string;
  label?: string;
  value?: string;
  selectOptions?: readonly string[];
  onChange?: (option: string) => void;
  errors?: string[];
  icon?: React.ReactNode;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onChange,
  errors,
  icon,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const formatValue = (dateStr: string) => {
    return dayjs(dateStr).format("D MMMM YYYY");
  };

  return (
    <InputFieldWrapper id={id} label={label} errors={errors}>
      <input type="hidden" id={id} name={id} value={value} />
      <span
        className={clsx(styles.inputField, icon ? styles.withIcon : "")}
        onClick={() => setOpenDatePicker(!openDatePicker)}
      >
        {icon && <i className={styles.icon}>{icon}</i>}
        {value ? formatValue(value) : "Select Date"}
        <motion.i
          className={`${styles.dropdownIcon} ${openDatePicker ? styles.dropdownOpen : ""}`}
        >
          <TbArrowBigDownLineFilled />
        </motion.i>
      </span>

      <AnimatePresence>
        {openDatePicker && (
          <CustomDatePicker
            value={value}
            onChange={(val) => {
              onChange?.(val);
            }}
            onClose={() => setOpenDatePicker(false)}
          />
        )}
      </AnimatePresence>
    </InputFieldWrapper>
  );
};

export default DateInput;
