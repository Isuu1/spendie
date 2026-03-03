import { RecurringPayment } from "../../types/recurring-payment";

export type SortOption = "Date" | "Amount" | "Name";

export function sortRecurringPayments(
  payments: RecurringPayment[],
  sortOption: SortOption,
) {
  const sorted = [...payments];

  const sortMap: Record<
    SortOption,
    (a: RecurringPayment, b: RecurringPayment) => number
  > = {
    Date: (a, b) =>
      new Date(a.next_payment_date).getTime() -
      new Date(b.next_payment_date).getTime(),
    Amount: (a, b) => a.amount - b.amount,
    Name: (a, b) => a.name.localeCompare(b.name),
  };

  return sorted.sort(sortMap[sortOption]);
}
