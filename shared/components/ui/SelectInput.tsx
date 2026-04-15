import React, { useMemo, useRef, useState } from "react";
//Styles
import styles from "./SelectInput.module.scss";
//Animations
import { AnimatePresence, motion } from "motion/react";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
//Icons
import { TbArrowBigDownLineFilled } from "react-icons/tb";
//Components
import PopUp from "../PopUp";

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
    <div className={`${styles.inputContainer} ${!label ? styles.noLabel : ""}`}>
      {/* Hidden input to store the selected value */}
      <input
        id={id}
        name={id}
        type="hidden"
        value={value?.value || ""}
        className={styles.selectInput}
      />

      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.fieldWrapper}>
        <div className={styles.inputFieldWrapper}>
          <span
            className={`${styles.inputField} ${styles.selectInputField} ${icon ? styles.withIcon : ""}`}
            onClick={() => setShowOptions((prev) => !prev)}
            role="button"
          >
            {icon && <i className={styles.icon}>{icon}</i>}
            {value?.label ?? selectOptions[0]?.label}
            <motion.i
              className={styles.dropdownIcon}
              animate={{ rotate: showOptions ? 180 : 0 }}
              transition={{ duration: 0.1 }}
            >
              <TbArrowBigDownLineFilled />
            </motion.i>
          </span>
        </div>
        <AnimatePresence>
          {showOptions && (
            <PopUp popupRef={selectRef} top={40} left={0} width="100%">
              <ul
                style={{
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
                className={styles.selectOptions}
              >
                {optionsHeader && (
                  <li className={styles.optionsHeader}>{optionsHeader}</li>
                )}
                {selectOptions?.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className={`${styles.option} ${value?.value === option.value ? styles.active : ""}`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </PopUp>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SelectInput;
