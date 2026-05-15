import React from "react";
import { cn } from "@/shared/lib/cn";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import type { FieldError } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type SelectInputProps = {
  id: string;
  label?: string;
  selectOptions: readonly Option[];
  value: string;
  onChange: (value: string) => void;
  error?: FieldError;
  className?: string;
};

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  selectOptions,
  value,
  onChange,
  error,
  className,
}) => {
  const errorClasses = error
    ? "ring-2 ring-red-600 border-red-600"
    : "border-transparent";

  return (
    <Field className={cn(className)}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger
          className={cn(
            "bg-input border-0 w-full cursor-pointer",
            errorClasses,
          )}
        >
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent className="bg-input text-primary">
          <SelectGroup className="bg-input">
            {label && <SelectLabel>{label}</SelectLabel>}
            {selectOptions?.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className={cn(
                  "cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap",
                  "hover:bg-input-hover!",
                  "focus:text-primary!",
                )}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
};

export default SelectInput;
