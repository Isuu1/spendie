import dayjs from "dayjs";
//Hooks
import { useTransactions } from "../hooks/useTransactions";
//Types
import { Transaction } from "../types/transaction";
//Components
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
//Utils
import { getCategoryIcon } from "../lib/utils/getCategoryIcon";
//Icons
import BaselineQuestionMarkIcon from "@iconify-react/ic/baseline-question-mark";
import { formatTransactionAmount } from "../lib/utils/formatTransactionAmount";

const TransactionsPanel = () => {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) {
    return <DashboardPanelLoader height={467} />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h4>Recent transactions</h4>
      </div>
      {transactions?.length === 0 && <p>No recent transactions found.</p>}

      {transactions?.slice(0, 6).map((transaction: Transaction) => {
        const Icon = getCategoryIcon(transaction.category as string);
        const { displayAmount, textColorClass } = formatTransactionAmount(
          transaction.amount,
          transaction.iso_currency_code,
        );

        return (
          <div
            key={transaction.transaction_id}
            className="grid grid-cols-4 max-sm:grid-cols-3 items-center justify-items-center px-1 rounded-md"
          >
            <div className="flex items-center gap-2 mr-auto">
              {Icon ? (
                <Icon className="size-8" />
              ) : (
                <BaselineQuestionMarkIcon className="size-8" />
              )}
              <p className="font-bold">{transaction.name ?? "Unknown"}</p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <p className={textColorClass}>{displayAmount}</p>
            </div>
            <p>{dayjs(transaction.date).format("D MMMM YYYY")}</p>
            <div className="max-sm:hidden justify-self-end">
              {transaction.pending ? (
                <div className="flex items-center">
                  <span className="block size-2 rounded-full bg-yellow-500" />
                  <span className="ml-2 text-sm text-secondary">Pending</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="block size-2 rounded-full bg-green-500" />
                  <span className="ml-2 text-sm text-secondary">Completed</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionsPanel;
