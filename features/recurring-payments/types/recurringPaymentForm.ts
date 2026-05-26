import z from "zod";
import { recurringPaymentSchema } from "../schemas/recurringPaymentSchema";

export const repeatOptions = [
  { label: "Monthly", value: "Monthly" },
  { label: "Weekly", value: "Weekly" },
];
export const typeOptions = [
  { label: "Income", value: "Income" },
  { label: "Expense", value: "Expense" },
];

export const categoryOptions = [
  { label: "Bills", value: "Bills" },
  { label: "Subscriptions", value: "Subscriptions" },
  { label: "Rent", value: "Rent" },
  { label: "Salary", value: "Salary" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Other", value: "Other" },
];

export type Repeat = (typeof repeatOptions)[number]["value"];
export type PaymentType = (typeof typeOptions)[number]["value"];
export type Category = (typeof categoryOptions)[number]["value"];
export type RecurringPaymentFormValues = z.infer<typeof recurringPaymentSchema>;
