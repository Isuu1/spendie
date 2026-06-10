import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../types/transaction";
import Image from "next/image";
import dayjs from "dayjs";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row }) => {
      const name = getValue() as string;
      const category = row.original.category as string;
      const newCategory = category.replace(/_/g, " ");
      const imageUrl = row.original.image_url as string;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={imageUrl}
            alt="Transaction"
            width={40}
            height={40}
            className="rounded-full"
          />
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
    header: "Amount",
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
    header: "Date",
    cell: ({ getValue }) => {
      const dateStr = getValue() as string;
      const date = new Date(dateStr);
      return <div>{dayjs(date).format("D MMMM YYYY")}</div>;
    },
  },
];
