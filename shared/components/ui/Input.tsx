"use client";

import React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
//Components
import InputFieldWrapper from "../InputFieldWrapper";
//Utils
import { cn } from "@/shared/lib/cn";

type InputProps = React.ComponentProps<typeof ShadcnInput> & {
  id: string;
  label: string;
  errors?: string[];
  icon?: React.ReactNode;
  passwordIcon?: React.ReactNode;
  value?: string | number | Date;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { icon, passwordIcon, id, label, errors, className, value, ...props },
    ref,
  ) => {
    return (
      <InputFieldWrapper id={id} label={label} errors={errors}>
        <ShadcnInput
          className={cn(
            "bg-bg-surface-dark rounded-md px-4 py-2 border-0 transition-all outline-3 outline-transparent duration-200 ease-in-out flex flex-1 items-center",
            "focus:outline-brand focus:outline-3",
            icon && "pl-10",
            className,
          )}
          ref={ref}
          id={id}
          name={id}
          {...props}
          value={
            value instanceof Date ? value.toISOString().slice(0, 10) : value
          }
        />
        {icon && <span className="absolute left-3 text-base!">{icon}</span>}
        {passwordIcon && (
          <span className="absolute left-3 text-base!">{passwordIcon}</span>
        )}
      </InputFieldWrapper>
    );
  },
);

Input.displayName = "Input";

export default Input;
