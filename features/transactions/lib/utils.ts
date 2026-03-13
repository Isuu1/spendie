export const displayTransactionAmount = (amount: number, currency: string) => {
  return amount > 0
    ? `-${amount} ${currency}`
    : `+${Math.abs(amount)} ${currency}`;
};

export const displayTransactionCategory = (category: string) => {
  if (!category || category.length === 0) {
    return "Uncategorized";
  }
  const newCategory = category.replace(/_/g, " ").toLowerCase();
  return newCategory;
};
