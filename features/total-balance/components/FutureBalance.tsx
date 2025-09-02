"use client";

import React, { useEffect, useRef, useState } from "react";
import moment, { Moment } from "moment";

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
import Button from "@/shared/components/ui/Button";
//import Modal from "@/shared/components/Modal";

interface FutureBalanceProps {
  recurringPayments: RecurringPayment[];
  totalBalance: number;
}

const calculateTotals = (payments: RecurringPayment[]) => {
  const income = payments
    .filter((p) => p.type.toLowerCase() === "income")
    .reduce((sum, p) => sum + p.amount, 0);

  const expense = payments
    .filter((p) => p.type.toLowerCase() === "expense")
    .reduce((sum, p) => sum + p.amount, 0);

  return { income, expense };
};

type Mode = "endOfMonth" | "specificDate";

const FutureBalance: React.FC<FutureBalanceProps> = ({
  totalBalance,
  recurringPayments,
}) => {
  const optionsRef = useRef<HTMLDivElement>(null);

  //States
  const [mode, setMode] = useState<Mode>("endOfMonth");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [dateSelected, setDateSelected] = useState<Moment | null>(null);

  //Payments filtering
  const specificDate =
    mode === "endOfMonth" ? moment().endOf("month") : dateSelected;

  const paymentsTillDate = populatePaymentsTillDate(
    specificDate || moment().endOf("month"),
    recurringPayments
  );

  const { income, expense } = calculateTotals(paymentsTillDate);

  const futureBalance = totalBalance + income - expense;

  //Range selection
  const handleSelectRange = (range: Mode) => {
    setMode(range);
    if (range === "specificDate" && !dateSelected) {
      setOpenDatePicker(true);
    }
    setShowOptions(false);
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

  const selectedOptionLabel =
    mode === "endOfMonth"
      ? "End of the month"
      : dateSelected
        ? dateSelected.format("DD MMM YYYY")
        : "Specific date";

  console.log("payments till date", paymentsTillDate);

  return (
    <div className={styles.futureBalance}>
      <div className={styles.menu}>
        <p>Upcoming changes by</p>

        <div className={styles.select}>
          {openDatePicker && (
            <DatePicker
              onSelect={() => {
                setOpenDatePicker(false);
              }}
              onChange={(date) => {
                if (date) {
                  console.log("Date in date picker", date);
                  setDateSelected(moment(date));
                }
              }}
              dateFormat="yyyy-MM-dd"
              minDate={moment().toDate()}
              inline
              //portalId="modal-root"
              onClickOutside={() => setOpenDatePicker(false)}
              calendarClassName={styles.datePicker}
            />
          )}
          <p
            className={styles.selectedOption}
            onClick={() => setShowOptions(!showOptions)}
          >
            {selectedOptionLabel}

            <IoMdArrowDropdown />
          </p>
        </div>

        {/* <Select handleSelectRange={handleSelectRange} /> */}
        {showOptions && (
          <div className={styles.options} ref={optionsRef}>
            <p
              className={`${styles.option} ${
                mode === "endOfMonth" ? styles.activeOption : undefined
              }`}
              onClick={() => handleSelectRange("endOfMonth")}
            >
              End of the month {mode === "endOfMonth" && <IoMdCheckmark />}
            </p>
            <p
              className={`${styles.option} ${
                mode === "specificDate" ? styles.activeOption : undefined
              }`}
              onClick={() => handleSelectRange("specificDate")}
            >
              {dateSelected
                ? dateSelected.format("DD MMM YYYY")
                : "Specific date"}
              {mode === "specificDate" && <IoMdCheckmark />}
              {dateSelected && (
                <Button
                  text="Edit"
                  variant="primary"
                  size="small"
                  type="button"
                  onClick={() => setOpenDatePicker(true)}
                />
              )}
            </p>
          </div>
        )}
      </div>
      <div className={styles.upcomingChanges}>
        {income > 0 && (
          <div className={styles.upcomingIncomes}>
            {paymentsTillDate.filter((p) => p.type === "Income").length} income
            – £{income.toFixed(2)}
          </div>
        )}
        {expense > 0 && (
          <div className={styles.upcomingExpenses}>
            {paymentsTillDate.filter((p) => p.type === "Expense").length}{" "}
            expense - £{expense.toFixed(2)}
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
