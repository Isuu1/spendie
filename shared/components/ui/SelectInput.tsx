import React, { useRef, useState } from "react";
//Styles
import styles from "./SelectInput.module.scss";
//Animations
import { AnimatePresence, motion } from "motion/react";
import { useClickOutside } from "@/shared/hooks/useClickOutside";

interface SelectInputProps {
  id: string;
  label?: string;
  value?: string;
  selectOptions?: readonly string[];
  onChange?: (option: string) => void;
  layout: "horizontal" | "vertical";
}

const selectModeOptionsVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.15 },
};

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  selectOptions,
  value,
  onChange,
  layout,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    onChange?.(option);
    setShowOptions(false);
  };

  useClickOutside(selectRef, () => setShowOptions(false));

  return (
    <div
      className={`${styles.selectContainer} ${styles[layout]}`}
      onClick={() => setShowOptions(!showOptions)}
      ref={selectRef}
    >
      {label && <label className={styles.label}>{label}</label>}

      {/* Hidden input to store the selected value */}

      <input
        id={id}
        name={id}
        type="hidden"
        value={value}
        className={styles.selectInput}
      />
      <div className={styles.optionsWrapper}>
        <span className={styles.value}>{value || selectOptions?.[0]}</span>
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
  );
};

export default SelectInput;
