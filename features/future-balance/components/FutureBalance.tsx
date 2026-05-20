"use client";

//Components
import FutureBalanceDateSelector from "@/features/future-balance/components/FutureBalanceDateSelector";
import PaymentsSummary from "@/features/future-balance/components/PaymentsSummary";
//Context
import { useFutureBalanceContext } from "../context/FutureBalanceContext";

type FutureBalanceProps = {
  selectedMode: "detailed" | "overview";
};

const FutureBalance = ({ selectedMode }: FutureBalanceProps) => {
  const { futureBalance, selectedDate } = useFutureBalanceContext();

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full mt-2">
      {selectedMode === "detailed" && (
        <>
          <FutureBalanceDateSelector />

          <PaymentsSummary />
        </>
      )}

      <div className="flex justify-between items-center w-full">
        {selectedMode === "detailed" ? (
          <h4 className="text-secondary">
            Balance{" "}
            {selectedDate
              ? `by ${selectedDate.format("DD MMM YYYY")}`
              : "at end of month"}
          </h4>
        ) : (
          <h4 className="text-secondary">After bills this month</h4>
        )}
        <h2>£{futureBalance.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default FutureBalance;
