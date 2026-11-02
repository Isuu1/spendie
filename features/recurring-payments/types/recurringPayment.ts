export type RecurringPaymentBase = {
  id: number;
  user_id: string;
  name: string;
  amount: number;
  category: string;
  is_paused: boolean;
};

//Recurring payment type stored in the database - servers as a skeleton
export type RecurringPayment = RecurringPaymentBase & {
  add_payment_date: string;
  type: string;
  repeat: string;
  first_payment_date: string;
  next_payment_date: Date;
  account_id: number | null;
  accounts?: {
    id: number;
    name: string;
    user_account_name?: string;
    plaid_items?: {
      institution_name: string;
    };
  };
};

//History of payments made - stored in a separate table
export type RecurringPaymentHistory = RecurringPaymentBase & {
  id: number;
  payment_id: number;
  payment_date: string;
  paid_date: string;
  type: string;
  status: string;
};
