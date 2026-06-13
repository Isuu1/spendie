import { useUserSettings } from "@/features/user/hooks/useUserSettings";
import { formatAmount } from "../lib/utils/formatAmount";
import { cn } from "../lib/cn";

type AmountProps = {
  amount: number;
  showTransactionColors?: boolean;
  className?: string;
};

export function Amount({
  amount,
  showTransactionColors,
  className,
}: AmountProps) {
  const { data: settings } = useUserSettings();

  const { displayAmount, textColorClass } = formatAmount(
    amount,
    settings?.currency ?? "GBP",
  );

  return (
    <span
      className={cn(
        showTransactionColors ? textColorClass : undefined,
        className,
      )}
    >
      {displayAmount}
    </span>
  );
}
