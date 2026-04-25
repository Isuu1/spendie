import React, { useMemo, useRef, useState } from "react";
//Animations
import { AnimatePresence, motion } from "motion/react";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
//Icons
import { TbArrowBigDownLineFilled } from "react-icons/tb";
//Components
import PopUp from "../PopUp";
import InputFieldWrapper from "../InputFieldWrapper";
import { cn } from "@/shared/lib/cn";

type Option = {
  label: string;
  value: string;
};

type SelectInputProps = {
  id: string;
  label?: string;
  value: Option;
  selectOptions: readonly Option[];
  optionsHeader?: React.ReactNode;
  onChange: (option: Option) => void;
  icon?: React.ReactNode;
};

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  selectOptions,
  optionsHeader,
  value,
  onChange,
  icon,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const getColumnCount = useMemo(() => {
    return (length: number) => {
      if (length > 14) return 3;
      if (length > 7) return 2;
      return 1;
    };
  }, []);

  const columns = getColumnCount(selectOptions?.length || 0);

  const handleOptionClick = (option: Option) => {
    onChange?.(option);
    setShowOptions(false);
  };

  useClickOutside(selectRef, () => setShowOptions(false));

  return (
    <InputFieldWrapper id={id} label={label}>
      {/* Hidden input to store the selected value */}
      <input id={id} name={id} type="hidden" value={value?.value || ""} />
      <span
        className={cn(
          "bg-bg-surface-dark cursor-pointer rounded-md px-4 py-2 border-0 transition-all outline-3 outline-transparent duration-200 ease-in-out flex flex-1 items-center justify-between gap-0.5",
        )}
        onClick={() => setShowOptions((prev) => !prev)}
        role="button"
      >
        {icon && <i className="absolute left-3 text-base!">{icon}</i>}
        {value?.label ?? selectOptions[0]?.label}
        <motion.i
          animate={{ rotate: showOptions ? 180 : 0 }}
          transition={{ duration: 0.1 }}
        >
          <TbArrowBigDownLineFilled />
        </motion.i>
      </span>
      <AnimatePresence>
        {showOptions && (
          <PopUp popupRef={selectRef} top={40} left={0} width="100%">
            <ul
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
              className="grid gap-4 p-1 w-max"
            >
              {optionsHeader && (
                <li className="col-span-full">{optionsHeader}</li>
              )}
              {selectOptions?.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={cn(
                    "cursor-pointer transition-colors duration-200 ease-in-out whitespace-nowrap",
                    value?.value === option.value && "text-brand",
                    "hover:text-brand",
                  )}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </PopUp>
        )}
      </AnimatePresence>
    </InputFieldWrapper>
  );
};

export default SelectInput;
