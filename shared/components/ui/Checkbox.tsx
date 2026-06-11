import React from "react";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

type CheckboxProps = React.ComponentProps<typeof ShadcnCheckbox> & {
  label: string;
};

const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <div>
      <Field orientation="horizontal">
        <ShadcnCheckbox {...props} />
        <Label htmlFor="checkbox" className="text-primary">
          {label}
        </Label>
      </Field>
    </div>
  );
};

export default Checkbox;
