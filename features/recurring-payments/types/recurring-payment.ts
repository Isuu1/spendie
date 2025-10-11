export type RecurringPaymentBase = {
  user_id: string;
  name: string;
  amount: number;
};

export type RecurringPayment = RecurringPaymentBase & {
  id: string;
  add_payment_date: string;
  next_payment_date: string;
  type: string;
  repeat: string;
  status?: "upcoming" | "late" | "paid";
};

export type RecurringPaymentHistory = RecurringPaymentBase & {
  id: string;
  payment_id: string;
  payment_date: string;
  paid_date: string;
};
