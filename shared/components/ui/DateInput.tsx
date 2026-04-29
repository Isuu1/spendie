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
import { Matcher } from "react-day-picker";

interface DateInputProps {
  id: string;
  label?: string;
  value?: Date;
  onChange?: (date: Date | null) => void;
  disabled?: Matcher;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onChange,
  disabled,
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
          className="bg-bg-surface-dark! rounded-lg w-auto p-4"
          align="end"
        >
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={value}
            onSelect={(date) => onChange?.(date ? date : null)}
            disabled={disabled}
            classNames={{
              day: cn("text-white rounded-md p-0.5"),
              day_button: cn(
                "flex items-center justify-center rounded-md cursor-pointer",
                "hover:bg-bg-surface-dark-hover! hover:text-white!",
              ),
              day_selected:
                "bg-brand! text-white! hover:bg-brand! hover:text-white!",
              today:
                "bg-bg-surface-dark-hover! text-white border-bg-brand! border-bg-brand! border-1",
              caption_label: "hidden",
              dropdown:
                "bg-bg-surface-dark! border-0 text-white cursor-pointer",
              nav: "top-0 w-full absolute flex justify-between text-lg text-white",
              button_next:
                "hover:bg-bg-surface-dark-hover! p-2 rounded-md text-lg cursor-pointer",
              button_previous:
                "hover:bg-bg-surface-dark-hover! p-2 rounded-md cursor-pointer",
              disabled: cn(
                "text-muted-foreground opacity-50 cursor-not-allowed!",
                "hover:bg-transparent!",
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
};

export default DateInput;
