//Styles
import styles from "./CustomDatepickerHeader.module.scss";
import moment from "moment";

interface CustomDatepickerHeaderProps {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  YEARS: number[];
}

const CustomDatepickerHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  YEARS,
}: CustomDatepickerHeaderProps) => {
  return (
    <div className={styles.header}>
      {/* Month navigation */}
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className={styles.navBtn}
      >
        ‹
      </button>

      {/* Month + Year */}
      <div className={styles.selects}>
        <select
          value={moment(date).month()}
          onChange={(e) => changeMonth(Number(e.target.value))}
        >
          {moment.months().map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={moment(date).year()}
          onChange={(e) => changeYear(Number(e.target.value))}
        >
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className={styles.navBtn}
      >
        ›
      </button>
    </div>
  );
};

export default CustomDatepickerHeader;
