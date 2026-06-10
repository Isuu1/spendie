"use client";

import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
//Hooks
import { useTransactions } from "../hooks/useTransactions";
//Types
import { Transaction } from "../types/transaction";
//Components
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/shared/components/ui/Button";

const columns: ColumnDef<Transaction>[] = [
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

const TransactionsGrid = () => {
  const { data: transactions, isLoading } = useTransactions();
  console.log(transactions, isLoading);

  const table = useReactTable<Transaction>({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <Table className="mt-4 bg-card rounded-2xl">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-card-foreground rounded-2xl"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="py-3 px-3">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-start space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransactionsGrid;
