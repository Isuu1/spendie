import { populateRecurringPayments } from "@/features/recurring-payments/lib/utils/populateRecurringPayments";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";
import { calculateTotals } from "../utils/calculateTotals";
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";

type ModeType = "endOfMonth" | "specificDate";

export function useFutureBalance(
  totalBalance: number,
  mode: ModeType,
  selectedDate: Dayjs | null,
  recurringPayments: RecurringPayment[],
) {
  const targetDate = useMemo(() => {
    return mode === "endOfMonth"
      ? dayjs().endOf("month")
      : (selectedDate ?? dayjs());
  }, [mode, selectedDate]);

  const populatedPayments = useMemo(
    () => populateRecurringPayments(targetDate, recurringPayments || []),
    [targetDate, recurringPayments],
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

  return {
    targetDate,
    populatedPayments,
    incomePayments,
    expensePayments,
    incomeTotal: income,
    expenseTotal: expense,
    futureBalance,
  };
}
