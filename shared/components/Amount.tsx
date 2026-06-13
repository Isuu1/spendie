import { useUserSettings } from "@/features/user/hooks/useUserSettings";
import { formatAmount } from "../lib/utils/formatAmount";
import { cn } from "../lib/cn";

type AmountProps = {
  amount: number;
  showTransactionColors?: boolean;
  className?: string;
  showSign?: boolean;
};

export function Amount({
  amount,
  showTransactionColors,
  className,
  showSign,
}: AmountProps) {
  const { data: settings } = useUserSettings();

  const { displayAmount, textColorClass } = formatAmount(
    amount,
    settings?.currency ?? "GBP",
    {
      absolute: showSign,
    },
  );

  return (
    <span
      className={cn(
        showTransactionColors ? textColorClass : undefined,
        className,
      )}
    >
      {showSign && amount !== 0 ? (amount > 0 ? "+ " : "- ") : undefined}
      {displayAmount}
    </span>
  );
}
