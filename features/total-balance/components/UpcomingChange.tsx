import React from "react";

//Icons
import { TbArrowBigDownFilled } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";

//Styles
import styles from "./UpcomingChange.module.scss";
import moment from "moment";

interface UpcomingChangeProps {
  type: "income" | "expense";
  data: {
    amount: number;
    date: string;
    description: string;
    name: string;
    type: string;
  };
}

const UpcomingChange: React.FC<UpcomingChangeProps> = ({ type, data }) => {
  const isIncome = type === "income";
  const labelStyle = isIncome ? styles.incomeLabel : styles.expenseLabel;
  const icon = isIncome ? <TbArrowBigUpFilled /> : <TbArrowBigDownFilled />;
  const itemBackground = isIncome
    ? styles.incomeBackground
    : styles.expenseBackground;

  return (
    <div className={`${styles.item} ${itemBackground}`}>
      <div className={`${styles.label} ${labelStyle}`}>
        <i className={styles.icon}>{icon}</i>
      </div>
      {data ? (
        <div className={styles.data}>
          <div className={styles.details}>
            <span className={styles.name}>{data.name}</span>
            <span className={styles.date}>
              {moment(data.date).format("DD MMM `YY")}
            </span>
          </div>

          <span className={styles.amount}>
            {isIncome ? (
              <span className={styles.income}>{`+£${data.amount}`}</span>
            ) : (
              <span className={styles.expense}>{`-£${data.amount}`}</span>
            )}
          </span>
        </div>
      ) : (
        <div className={styles.details}>
          <span>You don`t have any upcoming {type}.</span>
        </div>
      )}
    </div>
  );
};

export default UpcomingChange;
