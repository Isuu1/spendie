"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const buttonVariants = cva(
  "flex items-center justify-center gap-1.5 cursor-pointer border-0 w-fit transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        primary: "bg-brand hover:bg-brand-hover",
        secondary: "bg-bg-surface hover:bg-action-hover-dark",
        tertiary: "bg-bg-surface-dark hover:bg-action-hover-dark",
      },
      size: {
        small: "rounded-sm px-2 py-1",
        medium: "rounded-md px-4 py-2",
        large: "rounded-lg px-6 py-3",
      },
      iconPosition: {
        left: "flex-row",
        right: "flex-row-reverse",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 grayscale",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Button = ({
  children,
  icon,
  variant,
  size,
  iconPosition = "right",
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size, iconPosition, disabled }),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
};

export default Button;
