export const repeatOptions = [
  { label: "Monthly", value: "Monthly" },
  { label: "Weekly", value: "Weekly" },
];
export const typeOptions = [
  { label: "Income", value: "Income" },
  { label: "Expense", value: "Expense" },
];

export type Repeat = (typeof repeatOptions)[number]["value"];
export type PaymentType = (typeof typeOptions)[number]["value"];

export type RecurringPaymentFormState = {
  data: {
    name: string;
    repeat: Repeat;
    amount: number;
    type: PaymentType;
    next_payment_date: string;
  };
  success: boolean;
  message: string;
  error: string | null;
};

export const initialRecurringPaymentFormState: RecurringPaymentFormState = {
  data: {
    name: "",
    repeat: "Monthly",
    type: "Income",
    amount: 0,
    next_payment_date: "",
  },
  success: false,
  message: "",
  error: null,
};
