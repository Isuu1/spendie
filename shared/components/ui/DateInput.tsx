import React, { useState } from "react";
import dayjs from "dayjs";
//Animations
import { AnimatePresence, motion } from "motion/react";
//Components
import CustomDatePicker from "../CustomDatepicker/CustomDatepicker";
import InputFieldWrapper from "../InputFieldWrapper";
//Icons
import { TbArrowBigDownLineFilled } from "react-icons/tb";
//Utils
import { cn } from "@/shared/lib/cn";

interface DateInputProps {
  id: string;
  label?: string;
  value?: string;
  selectOptions?: readonly string[];
  onChange?: (option: string) => void;
  errors?: string[];
  icon?: React.ReactNode;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onChange,
  errors,
  icon,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const formatValue = (dateStr: string) => {
    return dayjs(dateStr).format("D MMMM YYYY");
  };

  return (
    <InputFieldWrapper id={id} label={label} errors={errors}>
      <input type="hidden" id={id} name={id} value={value} />
      <span
        className={cn(
          "bg-bg-surface-dark px-4 py-2 rounded-md cursor-pointer flex grow items-center justify-between outline-0 border-0",
          icon && "pl-10",
        )}
        onClick={() => setOpenDatePicker(!openDatePicker)}
      >
        {icon && <span className="absolute left-3">{icon}</span>}
        {value ? formatValue(value) : "Select Date"}
        <motion.span
          animate={openDatePicker ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TbArrowBigDownLineFilled />
        </motion.span>
      </span>

      <AnimatePresence>
        {openDatePicker && (
          <CustomDatePicker
            value={value}
            onChange={(val) => {
              onChange?.(val);
            }}
            onClose={() => setOpenDatePicker(false)}
          />
        )}
      </AnimatePresence>
    </InputFieldWrapper>
  );
};

export default DateInput;
