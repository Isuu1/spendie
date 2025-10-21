import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//Styles
import styles from "./DateInput.module.scss";
import moment from "moment";
import InputError from "../InputError";

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
  //onChange,
  layout,
  errors,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const formatValue = (dateStr: string) => {
    return moment(dateStr).format("Do MMMM YYYY");
  };

  return (
    <>
      <div className={`${styles.dateContainer} ${styles[layout]}`}>
        <input type="hidden" id={id} name={id} />
        {label && <label className={styles.label}>{label}</label>}
        <span
          className={styles.value}
          onClick={() => setOpenDatePicker(!openDatePicker)}
        >
          {value ? formatValue(value) : moment().format("Do MMMM YYYY")}
        </span>
        {openDatePicker && (
          <DatePicker
            selected={value ? new Date(value) : null}
            // onChange={(date) => {
            //   if (date) {
            //     onChange(date.toISOString());
            //   }
            // }}
            inline
            calendarClassName={styles.datePicker}
            minDate={moment().toDate()}
            onSelect={() => {
              setOpenDatePicker(false);
            }}
          />
        )}
      </div>
      {errors && errors.length > 0 && <InputError errors={errors} />}
    </>
  );
};

export default DateInput;
