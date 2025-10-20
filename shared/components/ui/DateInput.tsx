import React, { useState } from "react";
import DatePicker from "react-datepicker";
//Styles
import styles from "./DateInput.module.scss";
import moment from "moment";

interface DateInputProps {
  id: string;
  label?: string;
  value?: string;
  selectOptions?: readonly string[];
  onChange?: (option: string) => void;
  layout: "horizontal" | "vertical";
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onChange,
  layout,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <div>
      <div className={`${styles[layout]}`}>
        <input type="hidden" id={id} name={id} />
        {label && <label>{label}</label>}
        <div onClick={() => setOpenDatePicker(!openDatePicker)}>
          <span>{value || moment().format("MMMM Do YYYY")}</span>
        </div>
        {openDatePicker && (
          <DatePicker
            selected={value ? new Date(value) : null}
            onChange={(date) => {
              if (date) {
                onChange(date.toISOString());
              }
            }}
            inline
          />
        )}
      </div>
    </div>
  );
};

export default DateInput;
