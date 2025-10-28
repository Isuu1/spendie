import React, { useRef, useState } from "react";
//Styles
import styles from "./SelectInput.module.scss";
//Animations
import { AnimatePresence, motion } from "motion/react";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { TbArrowBigDownLineFilled } from "react-icons/tb";

interface SelectInputProps {
  id: string;
  label?: string;
  value?: string;
  selectOptions?: readonly string[];
  onChange?: (option: string) => void;
  icon?: React.ReactNode;
}

const selectModeOptionsVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  selectOptions,
  value,
  onChange,
  icon,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

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
            className={`${styles.inputField} ${icon ? styles.withIcon : ""}`}
            onClick={() => setShowOptions(!showOptions)}
            ref={selectRef}
          >
            {icon && <i className={styles.icon}>{icon}</i>}
            {value || selectOptions?.[0]}
            <motion.i
              className={`${styles.dropdownIcon} ${showOptions ? styles.dropdownOpen : ""}`}
            >
              <TbArrowBigDownLineFilled />
            </motion.i>
          </span>
          <AnimatePresence>
            {showOptions && (
              <motion.ul
                className={styles.selectOptions}
                variants={selectModeOptionsVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {selectOptions?.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`${styles.option} ${value === option ? styles.active : ""}`}
                  >
                    {option}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
