import React, { useState } from "react";
import dayjs from "dayjs";
//Components
import Button from "@/shared/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFutureBalanceContext } from "../context/FutureBalanceContext";
import DateInput from "@/shared/components/ui/DateInput";

const Select = () => {
  const [open, setOpen] = useState(false);

  const { selectedDate, setSelectedDate } = useFutureBalanceContext();

  const label = selectedDate
    ? selectedDate.format("DD MMM YYYY")
    : "End of month";

  // const options = useMemo(
  //   () => [
  //     {
  //       label: "End of the month",
  //       value: "endOfMonth",
  //     },
  //     {
  //       label: selectedDate
  //         ? selectedDate.format("DD MMM YYYY")
  //         : "Specific date",
  //       value: "specificDate",
  //     },
  //   ],
  //   [selectedDate],
  // );

  function handleDateSelect(date: Date | null) {
    if (!date) {
      setSelectedDate(null);
      return;
    }
    setSelectedDate(dayjs(date));
    setOpen(false);
  }

  // const handleSelect = (option: string) => {
  //   if (option === "endOfMonth") {
  //     onDateSelect(null);
  //   } else {
  //     setOpenDatePicker(true);
  //   }
  // };

  // const selectedOption = useMemo(() => {
  //   if (isEndOfMonth) {
  //     return options[0];
  //   }

  //   return options[1];
  // }, [isEndOfMonth, options]);

  return (
    <div className="flex items-center justify-between w-full gap-5">
      <p>Payments by date</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">{label}</Button>
        </PopoverTrigger>
        <PopoverContent className="bg-card w-auto">
          <Button
            variant="default"
            className=""
            onClick={() => {
              setSelectedDate(null);
              setOpen(false);
            }}
          >
            End of month
          </Button>
          <DateInput
            id="date"
            value={selectedDate?.toDate()}
            onChange={handleDateSelect}
          />
          {/* <p>
            {selectedDate
              ? selectedDate.format("DD MMM YYYY")
              : "Select a date"}
          </p> */}
          {/* <Calendar
                mode="single"
                selected={dateSelected ? dateSelected.toDate() : undefined}
                onSelect={(date) => {
                  onDateSelect(dayjs(date));
                  setOpenDatePicker(false);
                }}
              /> */}
        </PopoverContent>
      </Popover>
      {/* <div className="ml-auto">
        <SelectInput
          id="dateRange"
          value={selectedOption.value}
          selectOptions={options}
          onChange={handleSelect}
        />
      </div> */}
      {/* <Popover>
        <PopoverTrigger>{selectedOption.value}</PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={dateSelected ? dateSelected.toDate() : undefined}
            onSelect={(date) => {
              onDateSelect(dayjs(date));
              setOpenDatePicker(false);
            }}
          />
        </PopoverContent>
      </Popover> */}

      {/* {selectedDate && !isEndOfMonth && (
        <Button
          className="bg-input h-full"
          icon={<FilePenLine />}
          variant="secondary"
          size="sm"
          onClick={() => setOpenDatePicker(true)}
        />
      )} */}

      {/* <AnimatePresence>
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
          <Popover>
            <PopoverTrigger className="hidden" />
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateSelected ? dateSelected.toDate() : undefined}
                onSelect={(date) => {
                  onDateSelect(dayjs(date));
                  setOpenDatePicker(false);
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default Select;
