export type RecurringPayment = {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  add_payment_date: string;
  next_payment_date: string;
  type: string;
  repeat: string;
};
