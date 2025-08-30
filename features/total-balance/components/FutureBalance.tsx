"use client";

import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

//Styles
import styles from "./FutureBalance.module.scss";
//Types
import { RecurringPayment } from "@/shared/types/recurring-payment";
//Utils
import { populatePaymentsTillDate } from "@/features/recurring-payments/lib/utils/populatePaymentsTillDate";
//Icons
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
//Components
//import Select from "@/features/total-balance/components/Select";
//Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import Modal from "@/shared/components/Modal";

interface FutureBalanceProps {
  recurringPayments: RecurringPayment[];
  totalBalance: number;
}

const FutureBalance: React.FC<FutureBalanceProps> = ({
  totalBalance,
  recurringPayments,
}) => {
  const endOfMonth = moment().endOf("month");

  //States
  const [selectedRange, setSelectedRange] = useState(endOfMonth);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  //Payments filtering

  const paymentsTillDate = populatePaymentsTillDate(
    moment(selectedRange),
    recurringPayments
  );

  const incomePaymentsTillDate = paymentsTillDate.filter(
    (payment) => payment.type.toLowerCase() === "income"
  );
  const expensePaymentsTillDate = paymentsTillDate.filter(
    (payment) => payment.type.toLowerCase() === "expense"
  );

  const totalIncome = incomePaymentsTillDate.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const totalExpense = expensePaymentsTillDate.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  //Range selection
  const selectRange = (range: string) => {
    if (range === "end of the month") {
      setSelectedRange(endOfMonth);
      //setOpenDatePicker(false);
    }
    if (range === "by date") {
      setOpenDatePicker(true);
      console.log("Switched to date mode");
    }
  };

  //Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const futureBalance = totalBalance + totalIncome - totalExpense;

  const displaySelectedOption = () => {
    if (selectedRange.isSame(endOfMonth, "day")) {
      return "End of the month";
    }
    if (!selectedRange.isSame(endOfMonth, "day")) {
      return "Specific date";
    }
    return selectedRange.format("DD MMM YYYY");
  };

  console.log("Selected range:", selectedRange);

  return (
    <div className={styles.futureBalance}>
      <div className={styles.menu}>
        <p>Upcoming changes by</p>

        <div className={styles.select}>
          {openDatePicker && (
            <DatePicker
              selected={moment(selectedRange).toDate()}
              onSelect={() => setOpenDatePicker(false)}
              onChange={(date) => {
                if (date) {
                  console.log("Date in date picker", date);
                  setSelectedRange(moment(date));
                }
              }}
              dateFormat="yyyy-MM-dd"
              minDate={moment().toDate()}
              inline
              withPortal
              onClickOutside={() => setOpenDatePicker(false)}
              className={styles.datePicker}
            />
          )}
          <p
            className={styles.selectedOption}
            onClick={() => setShowOptions(!showOptions)}
          >
            {displaySelectedOption()}

            <IoMdArrowDropdown />
          </p>
          {showOptions && (
            <div className={styles.options} ref={optionsRef}>
              <p
                className={`${styles.option} ${
                  selectedRange.isSame(endOfMonth, "day")
                    ? styles.activeOption
                    : undefined
                }`}
                onClick={() => selectRange("end of the month")}
              >
                End of the month{" "}
                {selectedRange.isSame(endOfMonth, "day") && <IoMdCheckmark />}
              </p>
              <p
                className={`${styles.option} ${
                  !selectedRange.isSame(endOfMonth, "day")
                    ? styles.activeOption
                    : undefined
                }`}
                onClick={() => selectRange("by date")}
              >
                Specific date
              </p>
            </div>
          )}
        </div>

        {/* <Select selectRange={selectRange} /> */}
      </div>
      <div className={styles.upcomingChanges}>
        {incomePaymentsTillDate.length > 0 && (
          <div className={styles.upcomingIncomes}>
            {incomePaymentsTillDate.length} income - £
            {totalIncome.toFixed(2)}{" "}
          </div>
        )}
        {expensePaymentsTillDate.length > 0 && (
          <div className={styles.upcomingExpenses}>
            {expensePaymentsTillDate.length} expense - £
            {totalExpense.toFixed(2)}{" "}
          </div>
        )}
      </div>
      <div className={styles.balance}>
        <strong>Balance after</strong>
        <h2 className={styles.value}>£{futureBalance.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default FutureBalance;
