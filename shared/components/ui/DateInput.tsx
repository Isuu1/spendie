import React, { useState } from "react";
//Styles
import styles from "./DateInput.module.scss";
import moment from "moment";
import InputError from "../InputError";
//Animations
import { AnimatePresence, motion } from "motion/react";
//Components
import CustomDatePicker from "./CustomDatePicker";
//Icons
import { IoCalendarNumber } from "react-icons/io5";
import { TbArrowBigDownLineFilled } from "react-icons/tb";

interface DateInputProps {
  id: string;
  label?: string;
  value?: string;
  selectOptions?: readonly string[];
  onChange?: (option: string) => void;
  //layout: "horizontal" | "vertical";
  errors?: string[];
  icon?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onChange,
  //layout,
  errors,
  icon,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const formatValue = (dateStr: string) => {
    return moment(dateStr).format("Do MMMM YYYY");
  };

  return (
    <>
      <div className={styles.inputContainer}>
        {/* Hidden input to store the selected value */}
        <input type="hidden" id={id} name={id} value={value} />

        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.fieldWrapper}>
          <div className={styles.inputFieldWrapper}>
            <span
              className={`${styles.inputField} ${styles.dateInput} ${icon ? styles.withIcon : ""}`}
              onClick={() => setOpenDatePicker(!openDatePicker)}
            >
              {icon && <IoCalendarNumber className={styles.icon} />}
              {value ? formatValue(value) : moment().format("Do MMMM YYYY")}
              <motion.i
                className={`${styles.dropdownIcon} ${openDatePicker ? styles.dropdownOpen : ""}`}
              >
                <TbArrowBigDownLineFilled />
              </motion.i>
            </span>
          </div>
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
          {errors && errors.length > 0 && <InputError errors={errors} />}
        </div>
      </div>
    </>
  );
};

export default DateInput;
