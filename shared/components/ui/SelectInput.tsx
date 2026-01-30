import React, { useRef, useState } from "react";
//Styles
import styles from "./SelectInput.module.scss";
//Animations
import { AnimatePresence, motion } from "motion/react";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
//Icons
import { TbArrowBigDownLineFilled } from "react-icons/tb";
//Components
import PopUp from "../PopUp";

interface SelectInputProps {
  id: string;
  label?: string;
  value?: string;
  selectOptions?: readonly string[];
  optionsHeader?: React.ReactNode;
  onChange?: (option: string) => void;
  icon?: React.ReactNode;
}

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

  const getColumnCount = (length: number) => {
    if (length > 14) return 3;
    if (length > 7) return 2;
    return 1;
  };

  const columns = getColumnCount(selectOptions?.length || 0);

  const handleOptionClick = (option: string) => {
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
        value={value}
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
            onClick={() => setShowOptions(!showOptions)}
            // ref={selectRef}
          >
            {icon && <i className={styles.icon}>{icon}</i>}
            {value || selectOptions?.[0]}
            <motion.i
              className={`${styles.dropdownIcon} ${showOptions ? styles.dropdownOpen : ""}`}
            >
              <TbArrowBigDownLineFilled />
            </motion.i>
          </span>
        </div>
        <AnimatePresence>
          {showOptions && (
            <PopUp popupRef={selectRef} top={40} right={0}>
              <div ref={selectRef}>
                <ul
                  style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                  }}
                  className={styles.selectOptions}
                >
                  {optionsHeader && (
                    <li className={styles.optionsHeader}>{optionsHeader}</li>
                  )}
                  {selectOptions?.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className={`${styles.option} ${value === option ? styles.active : ""}`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </PopUp>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SelectInput;
