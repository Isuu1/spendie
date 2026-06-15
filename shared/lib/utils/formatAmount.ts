export function formatAmount(
  amount: number,
  currency: string,
  options?: { absolute?: boolean },
) {
  const isIncome = amount < 0;
  const absolute = options?.absolute ?? true;

  const value = absolute ? Math.abs(amount) : amount;

  return {
    displayAmount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value),
    textColorClass: isIncome ? "text-green-600" : "text-red-500",
  };
}
