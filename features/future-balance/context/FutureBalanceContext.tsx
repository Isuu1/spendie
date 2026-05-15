import React, { createContext, useContext, useMemo, useState } from "react";
import { useRecurringPayments } from "@/features/recurring-payments/hooks/useRecurringPayments";
import dayjs, { Dayjs } from "dayjs";
import { RecurringPayment } from "@/features/recurring-payments/types/recurringPayment";
import { populateRecurringPayments } from "@/features/recurring-payments/lib/utils/populateRecurringPayments";
import { calculateTotals } from "../utils/calculateTotals";

type FutureBalanceContextType = {
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;

  detailsType: "income" | "expense" | null;
  setDetailsType: (type: "income" | "expense" | null) => void;

  incomePayments: RecurringPayment[];
  expensePayments: RecurringPayment[];

  incomeTotal: number;
  expenseTotal: number;

  futureBalance: number;
};

const FutureBalanceContext = createContext<FutureBalanceContextType | null>(
  null,
);

type FutureBalanceProviderProps = {
  children: React.ReactNode;
  totalBalance: number;
};

export const FutureBalanceProvider = ({
  children,
  totalBalance,
}: FutureBalanceProviderProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [detailsType, setDetailsType] = useState<"income" | "expense" | null>(
    null,
  );

  const { data = [] } = useRecurringPayments();

  const targetDate = useMemo(() => {
    return selectedDate ?? dayjs().endOf("month");
  }, [selectedDate]);

  const populatedPayments = useMemo(
    () => populateRecurringPayments(targetDate, data || []),
    [targetDate, data],
  );

  const { income, expense } = useMemo(
    () => calculateTotals(populatedPayments),
    [populatedPayments],
  );

  const incomePayments = useMemo(
    () =>
      populatedPayments.filter((p) => p.type.toLocaleLowerCase() === "income"),
    [populatedPayments],
  );

  const expensePayments = useMemo(
    () =>
      populatedPayments.filter((p) => p.type.toLocaleLowerCase() === "expense"),
    [populatedPayments],
  );

  const futureBalance = useMemo(() => {
    return totalBalance + income - expense;
  }, [totalBalance, income, expense]);

  const value = {
    selectedDate,
    setSelectedDate,

    detailsType,
    setDetailsType,

    incomePayments,
    expensePayments,

    incomeTotal: income,
    expenseTotal: expense,

    futureBalance,
  };

  return (
    <FutureBalanceContext.Provider value={value}>
      {children}
    </FutureBalanceContext.Provider>
  );
};

export const useFutureBalanceContext = () => {
  const context = useContext(FutureBalanceContext);

  if (!context) {
    throw new Error(
      "useFutureBalanceContext must be used inside FutureBalanceProvider",
    );
  }

  return context;
};
