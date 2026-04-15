import { RecurringPayment } from "../types/recurring-payment";

export const sortingOptions = [
  {
    label: "Date (Soonest First)",
    value: "date_asc",
    sortFn: (a: RecurringPayment, b: RecurringPayment) =>
      new Date(a.next_payment_date).getTime() -
      new Date(b.next_payment_date).getTime(),
  },
  {
    label: "Date (Latest First)",
    value: "date_desc",
    sortFn: (a: RecurringPayment, b: RecurringPayment) =>
      new Date(b.next_payment_date).getTime() -
      new Date(a.next_payment_date).getTime(),
  },
  {
    label: "Amount (Low → High)",
    value: "amount_asc",
    sortFn: (a: RecurringPayment, b: RecurringPayment) => a.amount - b.amount,
  },
  {
    label: "Amount (High → Low)",
    value: "amount_desc",
    sortFn: (a: RecurringPayment, b: RecurringPayment) => b.amount - a.amount,
  },
];
