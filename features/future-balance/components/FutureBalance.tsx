"use client";

//Components
import FutureBalanceDateSelector from "@/features/future-balance/components/FutureBalanceDateSelector";
import PaymentsSummary from "@/features/future-balance/components/PaymentsSummary";
//Context
import { useFutureBalanceContext } from "../context/FutureBalanceContext";

const FutureBalance = () => {
  const { futureBalance, selectedDate } = useFutureBalanceContext();

  return (
    <div
      // className="flex flex-col items-center justify-center gap-5 p-5 min-w-90 rounded-lg shadow-default"
      className="flex flex-col items-center justify-center gap-6 min-w-80 mt-2"
    >
      <FutureBalanceDateSelector />

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
    </div>
  );
};

export default FutureBalance;
