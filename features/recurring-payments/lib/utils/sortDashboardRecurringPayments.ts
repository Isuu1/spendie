import { RecurringPayment } from "../../types/recurring-payment";

export type SortOption = "date" | "name";

export function sortDashboardRecurringPayments(
  payments: RecurringPayment[],
  sortOption: SortOption,
) {
  const sorted = [...payments];

  const sortMap: Record<
    SortOption,
    (a: RecurringPayment, b: RecurringPayment) => number
  > = {
    date: (a, b) =>
      new Date(a.next_payment_date).getTime() -
      new Date(b.next_payment_date).getTime(),
    name: (a, b) => a.name.localeCompare(b.name),
  };

  return sorted.sort(sortMap[sortOption]);
}
