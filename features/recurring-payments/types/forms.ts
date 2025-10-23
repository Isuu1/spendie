export const repeatOptions = ["Monthly", "Weekly", ""] as const;
export const typeOptions = ["Income", "Expense", ""] as const;

export type Repeat = (typeof repeatOptions)[number];
export type PaymentType = (typeof typeOptions)[number];

export type RecurringPaymentFormState = {
  data: {
    name: string;
    repeat: Repeat;
    amount: number;
    type: PaymentType;
    first_payment_date: string;
  };
  success: boolean;
  message: string;
  error: string | null;
};

export const initialRecurringPaymentFormState: RecurringPaymentFormState = {
  data: {
    name: "",
    repeat: "",
    type: "",
    amount: 0,
    first_payment_date: "",
  },
  success: false,
  message: "",
  error: null,
};
