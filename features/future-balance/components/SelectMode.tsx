import React, { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
//Components
import CustomDatePicker from "@/shared/components/CustomDatepicker/CustomDatepicker";
import SelectInput from "@/shared/components/ui/SelectInput";
import Button from "@/shared/components/ui/Button";
//Icons
import { FilePenLine } from "lucide-react";
//Animations
import { AnimatePresence } from "motion/react";

type SelectProps = {
  mode: "endOfMonth" | "specificDate";
  selectMode: (range: "endOfMonth" | "specificDate") => void;
  dateSelected: Dayjs | null;
  onDateSelect: (date: Dayjs | null) => void;
};

const Select = ({
  mode,
  selectMode,
  dateSelected,
  onDateSelect,
}: SelectProps) => {
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

  const handleSelect = (option: string) => {
    if (option === "endOfMonth") {
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
    <div className="flex items-center justify-between w-full gap-5">
      <p>Payments by date</p>
      <div className="ml-auto">
        <SelectInput
          id="dateRange"
          value={selectedOption.value}
          selectOptions={options}
          onChange={handleSelect}
        />
      </div>

      {dateSelected && mode === "specificDate" && (
        <Button
          className="bg-input h-full"
          icon={<FilePenLine />}
          variant="secondary"
          size="sm"
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
