import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../types/transaction";
import dayjs from "dayjs";
import { getCategoryIcon } from "../lib/utils/getCategoryIcon";
import BaselineQuestionMarkIcon from "@iconify-react/ic/baseline-question-mark";
import { ArrowUpDown } from "lucide-react";
import Button from "@/shared/components/ui/Button";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue, row }) => {
      const name = getValue() as string;
      const category = row.original.category as string;
      const newCategory = category.replace(/_/g, " ");
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
            <p className="text-sm text-secondary">
              {newCategory ?? "Uncategorized"}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    id: "amount",
    accessorFn: (row) => row.amount * -1,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.original.amount;
      const currency = row.original.iso_currency_code;
      return (
        <p className={amount > 0 ? "text-red-500" : "text-green-500"}>
          {Math.abs(amount)} {currency}
        </p>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const dateStr = getValue() as string;
      const date = new Date(dateStr);
      return <div>{dayjs(date).format("D MMMM YYYY")}</div>;
    },
  },
];
