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
};

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  selectOptions,
  value,
  onChange,
  error,
}) => {
  const errorClasses = error
    ? "ring-2 ring-red-600 border-red-600"
    : "border-transparent";

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger
          className={cn(
            "bg-bg-surface-dark border-0 w-full cursor-pointer",
            errorClasses,
          )}
        >
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent className="bg-bg-surface-dark">
          <SelectGroup className="bg-bg-surface-dark">
            <SelectLabel>{label}</SelectLabel>
            {selectOptions?.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className={cn(
                  "cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap",
                  "hover:bg-bg-surface-dark-hover!",
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
