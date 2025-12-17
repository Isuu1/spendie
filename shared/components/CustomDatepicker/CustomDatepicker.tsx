"use client";

import React, { useRef } from "react";
import moment from "moment";
//Styles
import styles from "./CustomDatepicker.module.scss";
//DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//Hooks
import { useClickOutside } from "@/shared/hooks/useClickOutside";
//Components
import CustomDatepickerHeader from "./CustomDatepickerHeader";
import PopUp from "../PopUp";

interface CustomDatePickerProps {
  onChange?: (option: string) => void;
  onClose?: () => void;
  value?: string | null;
  top?: number;
  left?: number;
  right?: number;
}

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

  const YEARS = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + i
  );

  return (
    <PopUp popupRef={datePickerRef} top={top} left={left} right={right}>
      <div className={styles.datePicker}>
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={(date) => {
            if (date) {
              onChange?.(date.toISOString());
            }
          }}
          inline
          minDate={moment().toDate()}
          onSelect={() => {
            onClose?.();
          }}
          formatWeekDay={(nameOfDay) => moment(nameOfDay, "dd").format("ddd")}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <CustomDatepickerHeader
              date={date}
              changeYear={changeYear}
              changeMonth={changeMonth}
              decreaseMonth={decreaseMonth}
              increaseMonth={increaseMonth}
              prevMonthButtonDisabled={prevMonthButtonDisabled}
              nextMonthButtonDisabled={nextMonthButtonDisabled}
              YEARS={YEARS}
            />
          )}
        />
      </div>
    </PopUp>
  );
};

export default CustomDatePicker;
