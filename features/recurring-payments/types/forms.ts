export type AddPaymentFormState = {
  success: boolean;
  message: string;
  //error: Record<string, { errors: string[] } | null> | null;
  error: Record<string, { errors: string[] }> | undefined | null;
};
