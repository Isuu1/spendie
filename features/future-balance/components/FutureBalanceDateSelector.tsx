import React, { useState } from "react";
import dayjs from "dayjs";
//Components
import Button from "@/shared/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DateInput from "@/shared/components/ui/DateInput";
//Context
import { useFutureBalanceContext } from "../context/FutureBalanceContext";

const FutureBalanceDateSelector = () => {
  const [open, setOpen] = useState(false);

  const { selectedDate, setSelectedDate } = useFutureBalanceContext();

  const label = selectedDate
    ? selectedDate.format("DD MMM YYYY")
    : "End of month";

  function handleDateSelect(date: Date | null) {
    if (!date) {
      setSelectedDate(null);
      return;
    }
    setSelectedDate(dayjs(date));
    setOpen(false);
  }

  return (
    <div className="flex items-center justify-between w-full gap-5">
      <p>Payments by date</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="default"
            variant="secondary"
            className="bg-background font-normal aria-expanded:bg-background"
          >
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-background w-auto p-1 gap-1">
          <Button
            className="bg-transparent hover:bg-card text-primary font-normal"
            size="default"
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
            className="text-primary! hover:bg-card bg-transparent"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FutureBalanceDateSelector;
