"use client";

import React from "react";
//Components
import InputFieldWrapper from "../InputFieldWrapper";
//Utils
import { cn } from "@/shared/lib/cn";

interface NumberInputProps {
  id: string;
  label?: string;
  errors?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | void;
  value?: string | number | Date;
  icon?: React.ReactNode;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  errors,
  onChange,
  value,
  icon,
}) => {
  return (
    <InputFieldWrapper id={id} label={label} errors={errors}>
      <input
        className={cn(
          "bg-bg-surface-dark rounded-md px-4 py-2 border-0 transition-all outline-3 outline-transparent duration-200 ease-in-out flex flex-1 items-center",
          "focus:outline-brand focus:outline-3",
          icon && "pl-10",
        )}
        id={id}
        name={id}
        type="number"
        onChange={onChange}
        value={value instanceof Date ? value.toISOString().slice(0, 10) : value}
      />
      {icon && <span className="absolute left-3 text-base!">{icon}</span>}
    </InputFieldWrapper>
  );
};

export default NumberInput;
