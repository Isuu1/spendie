import { useState } from "react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
//Styles
import styles from "./CustomDatepickerHeader.module.scss";
//Icons
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
//Components
import SelectInput from "../ui/SelectInput";

// Extend dayjs with the plugin
dayjs.extend(localeData);

interface CustomDatepickerHeaderProps {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

const CustomDatepickerHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: CustomDatepickerHeaderProps) => {
  //Current page offset for years pagination
  const [yearPageOffset, setYearPageOffset] = useState(0);

  const baseYear = dayjs().year() + yearPageOffset * 10;

  const years = Array.from({ length: 10 }, (_, i) => baseYear + i);

  const monthsSelect = dayjs.months().map((month, index) => ({
    label: month,
    value: index.toString(),
  }));

  const yearsSelect = years.map((year) => ({
    label: year.toString(),
    value: year.toString(),
  }));

  return (
    <div className={styles.header}>
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className={styles.navBtn}
      >
        <TbArrowBigLeftLinesFilled />
      </button>

      <div className={styles.selects}>
        <SelectInput
          id="select"
          selectOptions={monthsSelect}
          value={{
            label: dayjs(date).format("MMMM"),
            value: dayjs(date).month().toString(),
          }}
          onChange={(option) => changeMonth(Number(option.value))}
        />
        <SelectInput
          id="year-select"
          selectOptions={yearsSelect}
          value={{
            label: dayjs(date).year().toString(),
            value: dayjs(date).year().toString(),
          }}
          onChange={(option) => changeYear(Number(option.value))}
          optionsHeader={
            <div className={styles.yearHeader}>
              <button onClick={() => setYearPageOffset(yearPageOffset - 1)}>
                <TbArrowBigLeftLinesFilled className={styles.icon} />
              </button>
              <span>
                {years[0]} – {years[years.length - 1]}
              </span>
              <button onClick={() => setYearPageOffset(yearPageOffset + 1)}>
                <TbArrowBigRightLinesFilled className={styles.icon} />
              </button>
            </div>
          }
        />
      </div>

      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className={styles.navBtn}
      >
        <TbArrowBigRightLinesFilled />
      </button>
    </div>
  );
};

export default CustomDatepickerHeader;
