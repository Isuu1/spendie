import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const formVariants = cva("flex gap-4", {
  variants: {
    layout: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
});

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  layout: "horizontal" | "vertical";
  ref?: React.Ref<HTMLFormElement>;
}

const Form = ({ children, layout, ref, ...props }: FormProps) => {
  return (
    <form
      className={cn(formVariants({ layout }))}
      ref={ref}
      noValidate
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
