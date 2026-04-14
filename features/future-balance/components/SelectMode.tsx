import React, { useMemo, useState } from "react";
//Styles
import styles from "./SelectMode.module.scss";
//Components
import CustomDatePicker from "@/shared/components/CustomDatepicker/CustomDatepicker";
import SelectInput from "@/shared/components/ui/SelectInput";
import Button from "@/shared/components/ui/Button";
//Icons
import { MdEditDocument } from "react-icons/md";
import { AnimatePresence } from "motion/react";
import dayjs, { Dayjs } from "dayjs";

interface SelectProps {
  mode: "endOfMonth" | "specificDate";
  selectMode: (range: "endOfMonth" | "specificDate") => void;
  dateSelected: Dayjs | null;
  onDateSelect: (date: Dayjs | null) => void;
}

const Select: React.FC<SelectProps> = ({
  mode,
  selectMode,
  dateSelected,
  onDateSelect,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const options = useMemo(
    () => [
      {
        label: "End of the month",
        value: "endOfMonth",
      },
      {
        label: dateSelected
          ? dateSelected.format("DD MMM YYYY")
          : "Specific date",
        value: "specificDate",
      },
    ],
    [dateSelected],
  );

  const handleSelect = (option: { label: string; value: string }) => {
    if (option.value === "endOfMonth") {
      selectMode("endOfMonth");
    } else {
      selectMode("specificDate");
      if (!dateSelected) setOpenDatePicker(true);
    }
  };

  const selectedOption = useMemo(() => {
    if (mode === "endOfMonth") {
      return options[0];
    }

    return options[1];
  }, [mode, options]);

  return (
    <div className={styles.selectContainer}>
      <p>Payments by date</p>
      <div className={styles.select}>
        <SelectInput
          id="dateRange"
          value={selectedOption}
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
      <AnimatePresence>
        {openDatePicker && (
          <CustomDatePicker
            value={dateSelected ? dateSelected.toISOString() : null}
            onChange={(val) => {
              onDateSelect(val ? dayjs(val) : null);
            }}
            onClose={() => setOpenDatePicker(false)}
            top={50}
            right={0}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
