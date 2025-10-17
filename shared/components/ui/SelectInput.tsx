import React, { useState } from "react";
//Styles
import styles from "./SelectInput.module.scss";

interface SelectInputProps {
  label?: string;
  selectedOption?: string;
  selectOptions?: readonly string[];
  onChange?: (option: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  selectOptions,
  selectedOption,
  onChange,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option: string) => {
    onChange?.(option);
    setShowOptions(false);
  };

  return (
    <div
      className={styles.selectContainer}
      onClick={() => setShowOptions(!showOptions)}
    >
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.optionsWrapper}>
        <span className={styles.selectedOption}>
          {selectedOption || selectOptions?.[0]}
        </span>
        {showOptions && (
          <ul className={styles.selectOptions}>
            {selectOptions?.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
