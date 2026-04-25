"use client";

import React from "react";
//Components
import InputFieldWrapper from "../InputFieldWrapper";
//Utils
import { cn } from "@/shared/lib/cn";

interface InputProps {
  id: string;
  type: "text" | "number" | "email" | "password";
  label?: string;
  placeholder?: string;
  errors?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | void;
  defaultValue?: string | number;
  value?: string | number | Date;
  icon?: React.ReactNode;
  passwordIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  placeholder,
  errors,
  onChange,
  defaultValue,
  value,
  icon,
  passwordIcon,
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
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value instanceof Date ? value.toISOString().slice(0, 10) : value}
      />
      {icon && <span className="absolute left-3 text-base!">{icon}</span>}
      {passwordIcon && (
        <i className="absolute left-3 text-base!">{passwordIcon}</i>
      )}
    </InputFieldWrapper>
  );
};

export default Input;
