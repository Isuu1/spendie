export const displayTransactionAmount = (amount: number) => {
  return amount > 0
    ? `+${amount.toLocaleString("en-US", {
        style: "currency",
        currency: "GBP",
      })}`
    : `-${Math.abs(amount).toLocaleString("en-US", {
        style: "currency",
        currency: "GBP",
      })}`;
};

export const displayTransactionCategory = (category: string) => {
  if (!category || category.length === 0) {
    return "Uncategorized";
  }
  const newCategory = category.replace(/_/g, " ").toLowerCase();
  return newCategory;
};
