"use client";

//Components
import SelectMode from "@/features/future-balance/components/SelectMode";
import PaymentsSummary from "@/features/future-balance/components/PaymentsSummary";
//Animations
import { motion } from "motion/react";
//Context
import { useFutureBalanceContext } from "../context/FutureBalanceContext";

const FutureBalance = () => {
  const { futureBalance, selectedDate } = useFutureBalanceContext();

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-5 p-5 min-w-90 rounded-lg shadow-default"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <SelectMode />

      <PaymentsSummary />

      <div className="flex justify-between items-center w-full">
        <h4 className="text-secondary">
          Balance{" "}
          {selectedDate
            ? `by ${selectedDate.format("DD MMM YYYY")}`
            : "at end of month"}
        </h4>
        <h2>£{futureBalance.toFixed(2)}</h2>
      </div>
    </motion.div>
  );
};

export default FutureBalance;
