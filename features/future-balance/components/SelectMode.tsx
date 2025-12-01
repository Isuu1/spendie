import moment from "moment";
import React, { useMemo, useState } from "react";
//Styles
import styles from "./SelectMode.module.scss";
//Components
import CustomDatePicker from "@/shared/components/ui/CustomDatePicker";
import SelectInput from "@/shared/components/ui/SelectInput";
import Button from "@/shared/components/ui/Button";
//Icons
import { MdEditDocument } from "react-icons/md";

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

  const options = [
    "End of the month",
    dateSelected ? dateSelected.format("DD MMM YYYY") : "Specific date",
  ];

  console.log(
    "Rendering SelectMode with mode:",
    mode,
    "and dateSelected:",
    dateSelected
  );

  const handleSelect = (value: string) => {
    if (value === "End of the month") {
      selectMode("endOfMonth");
    } else {
      selectMode("specificDate");
      if (!dateSelected) setOpenDatePicker(true);
    }
  };

  const selectedLabel = useMemo(() => {
    if (mode === "endOfMonth") return "End of the month";
    if (dateSelected) return dateSelected.format("DD MMM YYYY");
    return "Specific date";
  }, [mode, dateSelected]);

  return (
    <div className={styles.selectContainer}>
      <p>Payments by date</p>
      <div className={styles.select}>
        <SelectInput
          id="dateRange"
          value={selectedLabel}
          selectOptions={options}
          onChange={handleSelect}
        />
      </div>

      {dateSelected && mode === "specificDate" && (
        <Button
          className={styles.editButton}
          icon={<MdEditDocument />}
          variant="secondary"
          size="medium"
          onClick={() => setOpenDatePicker(true)}
        />
      )}
      {openDatePicker && (
        <CustomDatePicker
          value={dateSelected ? dateSelected.toISOString() : null}
          onChange={(val) => {
            onDateSelect(val ? moment(val) : null);
          }}
          onClose={() => setOpenDatePicker(false)}
          top={50}
          right={0}
        />
      )}
    </div>
  );
};

export default Select;
