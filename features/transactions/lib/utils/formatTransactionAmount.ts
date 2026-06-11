export function formatTransactionAmount(amount: number, currency: string) {
  const isIncome = amount > 0;
  const absoluteAmount = Math.abs(amount);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(absoluteAmount);

  return {
    displayAmount: formatter,
    textColorClass: isIncome ? "text-green-600" : "text-red-500",
  };
}
