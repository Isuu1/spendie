import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../types/transaction";
import dayjs from "dayjs";
import { getCategoryIcon } from "../lib/utils/getCategoryIcon";
import BaselineQuestionMarkIcon from "@iconify-react/ic/baseline-question-mark";
import { formatTransactionAmount } from "../lib/utils/formatTransactionAmount";

export const transactionsPanelColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row }) => {
      const name = getValue() as string;
      const category = row.original.category as string;
      const date = row.original.date as Date;
      const accountName = row.original.accounts?.name;
      const userAccountName = row.original.accounts?.user_account_name;
      const institutionName =
        row.original.accounts?.plaid_items?.institution_name;
      const Icon = getCategoryIcon(category);
      return (
        <div
          className="flex items-center gap-3 min-w-40 max-w-70 truncate"
          title={name}
        >
          {Icon ? (
            <Icon className="size-8 shrink-0" />
          ) : (
            <BaselineQuestionMarkIcon className="size-8" />
          )}
          <div className="flex flex-col items-start gap-1">
            <strong>{name}</strong>
            <p className="text-sm text-secondary flex gap-1">
              {dayjs(date).format("D MMM YYYY")} · {institutionName}
            </p>
            <p className="text-xs text-secondary">
              {userAccountName || accountName}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "",
    //This allow filtering categories with multiple values (e.g. Food and drink + Shopping) without needing to create a custom filter function
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "amount",
    id: "amount",
    accessorFn: (row) => row.amount * -1,
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount;
      const currency = row.original.iso_currency_code;
      const { displayAmount, textColorClass } = formatTransactionAmount(
        amount,
        currency,
      );
      return <p className={textColorClass}>{displayAmount}</p>;
    },
  },
];
