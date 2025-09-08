import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";

//Styles
import styles from "./SelectMode.module.scss";
//Icons
import { IoMdArrowDropdown } from "react-icons/io";
//Components
import Button from "@/shared/components/ui/Button";
//Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SelectProps {
  mode: "endOfMonth" | "specificDate";
  dateSelected: moment.Moment | null;
  onDateSelect: (date: moment.Moment | null) => void;
  onRangeSelect: (range: "endOfMonth" | "specificDate") => void;
}

type Mode = "endOfMonth" | "specificDate";

const Select: React.FC<SelectProps> = ({
  mode,
  dateSelected,
  onDateSelect,
  onRangeSelect,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  //Range selection
  const handleSelectRange = (range: Mode) => {
    onRangeSelect(range);
    if (range === "specificDate" && !dateSelected) {
      setOpenDatePicker(true);
    }
    setShowOptions(false);
  };

  const selectedOptionLabel = useMemo(() => {
    if (mode === "endOfMonth") return "End of the month";
    if (dateSelected) return dateSelected.format("DD MMM YYYY");
    return "Specific date";
  }, [mode, dateSelected]);

  //Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.selectContainer}>
      <p>Changes at date</p>

      <div className={styles.select}>
        {openDatePicker && (
          <DatePicker
            onSelect={() => {
              setOpenDatePicker(false);
            }}
            onChange={(date) => {
              if (date) {
                console.log("Date in date picker", date);
                onDateSelect(moment(date));
              }
            }}
            dateFormat="yyyy-MM-dd"
            minDate={moment().toDate()}
            inline
            onClickOutside={() => setOpenDatePicker(false)}
            calendarClassName={styles.datePicker}
          />
        )}
        <p
          className={styles.selectedOption}
          onClick={() => setShowOptions(!showOptions)}
        >
          {selectedOptionLabel}

          <IoMdArrowDropdown />
        </p>
      </div>
      {dateSelected && mode === "specificDate" && (
        <Button
          text="Change"
          variant="primary"
          size="small"
          onClick={() => setOpenDatePicker(true)}
        />
      )}

      {showOptions && (
        <div
          className={`${styles.options} ${dateSelected && mode === "specificDate" ? styles.dateSelected : ""}`}
          ref={optionsRef}
        >
          <p
            className={`${styles.option} ${
              mode === "endOfMonth" ? styles.activeOption : undefined
            }`}
            onClick={() => handleSelectRange("endOfMonth")}
          >
            End of the month
          </p>
          <p
            className={`${styles.option} ${
              mode === "specificDate" ? styles.activeOption : undefined
            }`}
            onClick={() => handleSelectRange("specificDate")}
          >
            {dateSelected ? dateSelected.format("DD MM YYYY") : "Specific date"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Select;
