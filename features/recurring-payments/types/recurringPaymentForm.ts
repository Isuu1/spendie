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
