import React, { useState } from "react";

//Styles
import styles from "./SegmentedControl.module.scss";

type SegmentedControlProps = {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

const SegmentedControl = ({ options, onChange }: SegmentedControlProps) => {
  const [activeOption, setActiveOption] = useState(options[0].value);
  return (
    <ul className={styles.menu}>
      {options.map((option) => (
        <li
          key={option.value}
          className={`${styles.item} ${activeOption === option.value ? styles.active : ""}`}
          onClick={() => {
            setActiveOption(option.value);
            onChange(option.value);
          }}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default SegmentedControl;
