"use client";

import React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
//Utils
import { cn } from "@/shared/lib/cn";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FieldError } from "react-hook-form";

type InputProps = React.ComponentProps<typeof ShadcnInput> & {
  id: string;
  label: string;
  icon?: React.ReactNode;
  passwordIcon?: React.ReactNode;
  value?: string | number | Date;
  error?: FieldError;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { icon, id, label, className, value, passwordIcon, error, ...props },
    ref,
  ) => {
    const errorClasses = error
      ? "ring-2 ring-red-600 border-red-600"
      : "border-transparent";

    return (
      <Field>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <InputGroup
          className={cn(
            "bg-bg-surface-dark rounded-md border transition-all duration-200 ease-in-out outline-none",
            "border-transparent!",
            "focus-within:ring-2 focus-within:ring-bg-bg-surface-dark-hover focus-within:border-bg-surface-dark-hover",
            className,
            errorClasses,
          )}
        >
          <InputGroupAddon>{icon}</InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {passwordIcon && (
              <button type="button" className="cursor-pointer">
                {passwordIcon}
              </button>
            )}
          </InputGroupAddon>
          <InputGroupInput
            ref={ref}
            id={id}
            name={id}
            {...props}
            value={
              value instanceof Date ? value.toISOString().slice(0, 10) : value
            }
          />
        </InputGroup>
      </Field>
    );
  },
);

Input.displayName = "Input";

export default Input;
