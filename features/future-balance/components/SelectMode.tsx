import moment from "moment";
import React, { useMemo, useRef, useState } from "react";
//Styles
import styles from "./SelectMode.module.scss";
//Icons
import { IoMdArrowDropdown } from "react-icons/io";
import { MdEditDocument } from "react-icons/md";
//Components
import Button from "@/shared/components/ui/Button";
//Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//Animations
import { AnimatePresence } from "motion/react";
//Hooks
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import PopUp from "@/shared/components/PopUp";

interface SelectProps {
  mode: "endOfMonth" | "specificDate";
  selectMode: (range: "endOfMonth" | "specificDate") => void;
  dateSelected: moment.Moment | null;
  onDateSelect: (date: moment.Moment | null) => void;
}

const Select: React.FC<SelectProps> = ({
  mode,
  selectMode,
  dateSelected,
  onDateSelect,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  //Range selection
  const handleSelectRange = (range: "endOfMonth" | "specificDate") => {
    selectMode(range);
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

  useClickOutside(optionsRef, () => setShowOptions(false));

  return (
    <div className={styles.selectContainer}>
      <p>Payments by date</p>

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
          //text="Change"
          icon={<MdEditDocument />}
          variant="primary"
          size="small"
          onClick={() => setOpenDatePicker(true)}
        />
      )}
      <AnimatePresence>
        {showOptions && (
          <PopUp top={50} right={0} popupRef={optionsRef}>
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
              {dateSelected
                ? dateSelected.format("DD MM YYYY")
                : "Specific date"}
            </p>
          </PopUp>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
