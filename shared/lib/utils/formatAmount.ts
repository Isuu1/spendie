export function formatAmount(amount: number, currency: string) {
  const isIncome = amount < 0;
  const absoluteAmount = Math.abs(amount);

  return {
    displayAmount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(absoluteAmount),
    textColorClass: isIncome ? "text-green-600" : "text-red-500",
  };
}
