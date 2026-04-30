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

type InputProps = React.ComponentProps<typeof ShadcnInput> & {
  id: string;
  label: string;
  icon?: React.ReactNode;
  passwordIcon?: React.ReactNode;
  value?: string | number | Date;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, id, label, className, value, passwordIcon, ...props }, ref) => {
    return (
      <Field>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <InputGroup
          className={cn(
            "bg-bg-surface-dark rounded-md px-1 border-0 transition-all outline-3 outline-transparent duration-200 ease-in-out",
            "focus:outline-brand focus:outline-3",
            className,
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
