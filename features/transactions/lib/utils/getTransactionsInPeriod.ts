import { Transaction } from "../../types/transaction";
import { Dayjs } from "dayjs";

export function getTransactionsInPeriod(
  transactions: Transaction[],
  from: Date | Dayjs,
  to: Date | Dayjs,
) {
  return transactions.filter((transaction) => {
    const date = new Date(transaction.date);

    return date >= from && date <= to;
  });
}
