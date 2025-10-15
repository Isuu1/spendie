export type RecurringPaymentFormState = {
  data: {
    name: string;
    repeat: string;
    amount: number;
    type: string;
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
