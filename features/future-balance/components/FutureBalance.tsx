"use client";

//Components
import FutureBalanceDateSelector from "@/features/future-balance/components/FutureBalanceDateSelector";
import PaymentsSummary from "@/features/future-balance/components/PaymentsSummary";
//Context
import { useFutureBalanceContext } from "../context/FutureBalanceContext";
import { Amount } from "@/shared/components/Amount";

const FutureBalance = () => {
  const { futureBalance, selectedDate } = useFutureBalanceContext();

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full mt-2">
      <FutureBalanceDateSelector />

      <PaymentsSummary />

      <div className="flex justify-between items-center w-full">
        <h4 className="text-secondary">
          Balance{" "}
          {selectedDate
            ? `by ${selectedDate.format("DD MMM YYYY")}`
            : "at end of month"}
        </h4>
        <Amount
          amount={futureBalance ?? 0}
          showSign
          className="text-xl font-semibold"
        />
      </div>
    </div>
  );
};

export default FutureBalance;
