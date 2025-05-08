import React from "react";
//import moment from "moment";

//Styles
import styles from "./TotalBalanceTile.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
//Providers
import { useUser } from "@/shared/providers/UserProvider";
import { useAccounts } from "@/shared/providers/AccountsProvider";
import { getLatestStandingOrder } from "../lib/utils";

const TotalBalanceTile = () => {
  const { accounts } = useAccounts();
  const { user } = useUser();

  // const [displayedFutureBalance, setDisplayedFutureBalance] =
  //   useState<string>("end of the month");

  if (!accounts) {
    return <p>Loading...</p>;
  }

  const totalBalance = accounts?.reduce((sum, currentAccount) => {
    const currentBalance = currentAccount.balances.current ?? 0;
    return sum + currentBalance;
  }, 0);

  const latestStandingOrderIncome = getLatestStandingOrder("income", user);
  const latestStandingOrderExpense = getLatestStandingOrder("expense", user);

  // const startOfMonth = moment().startOf("month");
  // const endOfMonth = moment().endOf("month");

  // const calculateFutureBalance = () => {
  //   if (!latestStandingOrderIncome && !latestStandingOrderExpense) {
  //     return; // No income date available
  //   }
  //   const incomeDate = moment(new Date(latestStandingOrderIncome.date));
  //   const expenseDate = moment(new Date(latestStandingOrderExpense.date));
  //   let incomeAmountForCalculation = 0;
  //   let expenseAmountForCalculation = 0;
  //   if (displayedFutureBalance === "end of the month") {
  //     if (incomeDate.isBetween(startOfMonth, endOfMonth, null, "[]")) {
  //       //'[]' includes start and end dates
  //       incomeAmountForCalculation = latestStandingOrderIncome.amount ?? 0;
  //     }

  //     if (expenseDate.isBetween(startOfMonth, endOfMonth, null, "[]")) {
  //       //'[]' includes start and end dates
  //       expenseAmountForCalculation = latestStandingOrderExpense.amount ?? 0;
  //     }
  //   }
  //   if (displayedFutureBalance === "after next income") {
  //     if (incomeDate.isAfter(moment(), "day")) {
  //       incomeAmountForCalculation = latestStandingOrderIncome.amount ?? 0;
  //     }

  //     if (expenseDate.isAfter(moment(), "day")) {
  //       expenseAmountForCalculation = latestStandingOrderExpense.amount ?? 0;
  //     }
  //   }

  //   return (
  //     totalBalance + incomeAmountForCalculation - expenseAmountForCalculation
  //   );
  // };

  const handleFutureBalanceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    console.log("Selected value:", selectedValue);
    //setDisplayedFutureBalance(selectedValue);
  };

  return (
    <div className={styles.totalBalanceTile}>
      <h1 className={styles.balance}>£{totalBalance ?? 0}</h1>

      <div className={styles.futureBalance}>
        <div className={styles.range}>
          <label htmlFor="range">Time period</label>
          <select
            id="range"
            name="range"
            className={styles.select}
            onChange={handleFutureBalanceChange}
          >
            <option value="end of the month">End of the month</option>
            <option value="after next income">After next income</option>
          </select>
        </div>
        {/* {displayedFutureBalance === "end of the month" && (
          <p className={styles.rangeSubtitle}>
            {moment().endOf("month").format("DD MMMM YYYY")}
          </p>
        )}
        {displayedFutureBalance === "after next income" && (
          <p className={styles.rangeSubtitle}>
            {moment(new Date(latestStandingOrderIncome.date)).format(
              "DD MMMM YYYY"
            )}
          </p>
        )} */}
        {/* <h2 className={styles.value}>£{calculateFutureBalance().toFixed(2)}</h2> */}
      </div>

      <div className={styles.stats}>
        <h3 className={styles.title}>Incoming changes</h3>
        <div className={styles.income}>
          <div className={styles.label}>
            <FaLongArrowAltUp />
            <p>Income</p>
          </div>
          {latestStandingOrderIncome ? (
            <div className={styles.incomeDetails}>
              <span>{latestStandingOrderIncome.date}</span>
              <span>{latestStandingOrderIncome.name}</span>
              <span>{latestStandingOrderIncome.amount}£</span>
            </div>
          ) : (
            <div className={styles.incomeDetails}>
              <span>No standing orders set up</span>
            </div>
          )}
        </div>
        <div className={styles.expense}>
          <div className={styles.label}>
            <FaLongArrowAltDown />
            <p>Expense</p>
          </div>
          {latestStandingOrderExpense ? (
            <div className={styles.incomeDetails}>
              <span>{latestStandingOrderExpense.date}</span>
              <span>{latestStandingOrderExpense.name}</span>
              <span>{latestStandingOrderExpense.amount}£</span>
            </div>
          ) : (
            <div className={styles.incomeDetails}>
              <span>No standing orders set up</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalBalanceTile;
