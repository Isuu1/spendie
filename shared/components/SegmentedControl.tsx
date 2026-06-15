import { cn } from "../lib/cn";
import React, { useState } from "react";

type SegmentedControlProps = {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

const SegmentedControl = ({ options, onChange }: SegmentedControlProps) => {
  const [activeOption, setActiveOption] = useState(options[0].value);
  return (
    <nav className="flex items-center gap-4 p-1 bg-background rounded-full w-fit">
      {options.map((option) => (
        <span
          key={option.value}
          className={cn(
            "cursor-pointer rounded-full px-4 py-2 transition-colors",
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
