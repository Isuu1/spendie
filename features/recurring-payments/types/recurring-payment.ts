export type RecurringPaymentBase = {
  id: string;
  user_id: string;
  name: string;
  amount: number;
};

//Recurring payment type stored in the database - servers as a skeleton
export type RecurringPayment = RecurringPaymentBase & {
  add_payment_date: string;
  type: string;
  repeat: string;
  first_payment_date: string;
};

//History of payments made - stored in a separate table
export type RecurringPaymentHistory = RecurringPaymentBase & {
  payment_id: string;
  payment_date: string;
  paid_date: string;
};

//Populated recurring payment with additional fields for display and status
export type PopulatedRecurringPayment = RecurringPayment & {
  status: "upcoming" | "late";
  next_payment_date: string;
};
