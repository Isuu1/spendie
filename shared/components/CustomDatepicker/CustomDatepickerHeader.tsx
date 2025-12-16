import moment from "moment";
//Styles
import styles from "./CustomDatepickerHeader.module.scss";
//Icons
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
//Components
import SelectInput from "../ui/SelectInput";

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
  console.log("date in header:", moment(date).format("MMMM"));
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
          selectOptions={YEARS.map((year) => year.toString())}
          value={moment(date).year().toString()}
          onChange={(value) => changeYear(Number(value))}
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
