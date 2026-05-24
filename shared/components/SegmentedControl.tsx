import { cn } from "../lib/cn";
import React, { useState } from "react";

type SegmentedControlProps = {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

const SegmentedControl = ({ options, onChange }: SegmentedControlProps) => {
  const [activeOption, setActiveOption] = useState(options[0].value);
  return (
    <nav className="flex items-center gap-4 bg-card rounded-lg w-fit">
      {options.map((option) => (
        <span
          key={option.value}
          className={cn(
            "cursor-pointer rounded-md px-4 py-2 transition-colors",
            activeOption === option.value && "bg-accent",
          )}
          onClick={() => {
            setActiveOption(option.value);
            onChange(option.value);
          }}
        >
          {option.label}
        </span>
      ))}
    </nav>
  );
};

export default SegmentedControl;
