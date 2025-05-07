import React from "react";

//Styles
import styles from "./TotalBalanceTile.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
//Providers
import { useUser } from "@/shared/providers/UserProvider";
import { useAccounts } from "@/shared/providers/AccountsProvider";
import moment from "moment";

const TotalBalanceTile = () => {
  const { accounts } = useAccounts();
  const { user } = useUser();

  //const [displayedBalance, setDisplayedBalance] = useState<number>(0);

  if (!accounts) {
    return <p>Loading...</p>;
  }

  const totalBalance = accounts?.reduce((sum, currentAccount) => {
    const currentBalance = currentAccount.balances.current ?? 0;
    return sum + currentBalance;
  }, 0);

  const getLatestStandingOrder = (type: string) => {
    const filteredByType = user?.standing_orders?.filter(
      (standingOrder) => standingOrder.type === type
    );
    if (!filteredByType || filteredByType.length === 0) {
      return null; //No standing orders of this type
    }

    const sortedStandingOrders = filteredByType.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    return sortedStandingOrders[0] ?? null;
  };

  const latestStandingOrderIncome = getLatestStandingOrder("income");
  const latestStandingOrderExpense = getLatestStandingOrder("expense");

  const calculateFutureBalance = () => {
    const currentBalance = totalBalance ?? 0;
    const currentDate = moment(new Date()).format("D MMM YYYY");
    console.log("currentDate", currentDate);

    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");

    let incomeAmountForCalculation = 0;
    if (latestStandingOrderIncome?.date) {
      const incomeDate = moment(new Date(latestStandingOrderIncome.date));
      console.log("incomeDate", incomeDate);

      if (incomeDate.isBetween(startOfMonth, endOfMonth, null, "[]")) {
        //'[]' includes start and end dates
        incomeAmountForCalculation = latestStandingOrderIncome.amount ?? 0;
      }
    }

    let expenseAmountForCalculation = 0;
    if (latestStandingOrderExpense?.date) {
      const expenseDate = moment(new Date(latestStandingOrderExpense.date));
      if (expenseDate.isBetween(startOfMonth, endOfMonth, null, "[]")) {
        //'[]' includes start and end dates
        expenseAmountForCalculation = latestStandingOrderExpense.amount ?? 0;
      }
    }

    return (
      currentBalance + incomeAmountForCalculation - expenseAmountForCalculation
    );
  };

  return (
    <div className={styles.totalBalanceTile}>
      <h1 className={styles.balance}>£{totalBalance ?? 0}</h1>

      <div className={styles.futureBalance}>
        <div className={styles.range}>
          <label htmlFor="range">Time period</label>
          <select id="range" name="range" className={styles.select}>
            <option value="1">End of the month</option>
            <option value="2">Until next payment</option>
          </select>
        </div>

        <h2 className={styles.value}>£{calculateFutureBalance().toFixed(2)}</h2>
      </div>

      <div className={styles.stats}>
        <h3 className={styles.title}>What`s next</h3>
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
              <span>No planned income this month</span>
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
              <span>No planned expenses this month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalBalanceTile;
