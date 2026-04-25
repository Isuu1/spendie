"use client";

import * as React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/shared/lib/cn";

type ButtonProps = React.ComponentProps<typeof ShadcnButton> & {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, icon, iconPosition = "right", className, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        className={cn(
          "gap-1.5 cursor-pointer transition-colors duration-200",
          className,
        )}
        {...props}
      >
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </ShadcnButton>
    );
  },
);

Button.displayName = "Button";

export default Button;
