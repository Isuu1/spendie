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
            <p>{name}</p>
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
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      const dateStr = getValue() as string;
      const date = new Date(dateStr);
      return <div>{dayjs(date).format("D MMMM YYYY")}</div>;
    },
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
  {
    accessorKey: "pending",
    header: "Status",
    meta: {
      //Hidden on mobile, visible on small screens and up
      className: "hidden sm:table-cell",
    },
    cell: ({ getValue }) => {
      const pending = getValue() as boolean;
      return (
        <div>
          {pending ? (
            <div className="flex items-center justify-center">
              <span className="block size-2 rounded-full bg-yellow-500" />
              <span className="ml-2 text-sm text-secondary">Pending</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="block size-2 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-secondary">Completed</span>
            </div>
          )}
        </div>
      );
    },
  },
];
