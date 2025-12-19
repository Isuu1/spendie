import moment from "moment";
//Styles
import styles from "./CustomDatepickerHeader.module.scss";
//Icons
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
//Components
import SelectInput from "../ui/SelectInput";
import { useState } from "react";

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

  const baseYear = moment().year() + yearPageOffset * 10;

  const years = Array.from({ length: 10 }, (_, i) => baseYear + i);

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
          selectOptions={moment.months()}
          value={moment(date).format("MMMM")}
          onChange={(value) =>
            changeMonth(moment.months().indexOf(value.toString()))
          }
        />
        <SelectInput
          id="year-select"
          selectOptions={years.map((year) => year.toString())}
          value={moment(date).year().toString()}
          onChange={(value) => changeYear(Number(value))}
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
