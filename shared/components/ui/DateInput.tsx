import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//Styles
import styles from "./DateInput.module.scss";
import moment from "moment";
import InputError from "../InputError";
//Animations
import { AnimatePresence, motion } from "motion/react";

interface DateInputProps {
  id: string;
  label?: string;
  value?: string;
  selectOptions?: readonly string[];
  onChange?: (option: string) => void;
  layout: "horizontal" | "vertical";
  errors?: string[];
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onChange,
  layout,
  errors,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const formatValue = (dateStr: string) => {
    return moment(dateStr).format("Do MMMM YYYY");
  };

  return (
    <>
      <div className={`${styles.inputContainer} ${styles[layout]}`}>
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
              className={styles.inputField}
              onClick={() => setOpenDatePicker(!openDatePicker)}
            >
              {value ? formatValue(value) : moment().format("Do MMMM YYYY")}
            </span>
          </div>
          <AnimatePresence>
            {openDatePicker && (
              <motion.div className={styles.datePickerWrapper}>
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
                    setOpenDatePicker(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {errors && errors.length > 0 && <InputError errors={errors} />}
    </>
  );
};

export default DateInput;
