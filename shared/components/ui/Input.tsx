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
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, passwordIcon, id, label, errors, className, ...props }, ref) => {
    return (
      <InputFieldWrapper id={id} label={label} errors={errors}>
        <ShadcnInput
          className={cn(icon && "pl-10", className)}
          ref={ref}
          id={id}
          name={id}
          {...props}
          value={
              value instanceof Date
                ? value.toISOString().slice(0, 10)
                : value
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
