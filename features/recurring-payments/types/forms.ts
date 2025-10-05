export type AddPaymentFormState = {
  data: {
    name: string;
    repeat: string;
    amount: number;
    type: string;
    next_payment_date: string;
  };
  success: boolean;
  message: string;
  error: Record<string, { errors: string[] }> | undefined | null;
};
