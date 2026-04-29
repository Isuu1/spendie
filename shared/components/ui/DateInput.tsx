import React from "react";
import dayjs from "dayjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "./Button";
import { CalendarIcon } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface DateInputProps {
  id: string;
  label?: string;
  value?: Date;
  onChange?: (date: Date | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  const formatValue = (dateStr: Date) => {
    return dayjs(dateStr).format("D MMMM YYYY");
  };

  console.log("Rendering DateInput with value:", value);

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            data-empty={!value}
            className={cn(
              "w-70 justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
              "bg-bg-surface-dark",
              "hover:bg-bg-surface-dark",
            )}
          >
            <CalendarIcon />
            {value ? formatValue(value) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          //className="bg-bg-surface-dark! rounded-lg w-auto p-0"
          align="end"
        >
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={value}
            onSelect={(date) => onChange?.(date ? date : null)}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
};

export default DateInput;
