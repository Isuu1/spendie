"use client";
import React from "react";
import Link from "next/link";
//Icons
import { IdCard } from "lucide-react";
//Components
import SelectInput from "@/shared/components/ui/SelectInput";
import ErrorMessage from "@/shared/components/ErrorMessage";
import RecurringPaymentItem from "./RecurringPaymentItem";
//Hooks
import { useRecurringPayments } from "../hooks/useRecurringPayments";
import { useSorting } from "@/shared/hooks/useSorting";
//Config
import { sortingOptions } from "../config/sortingOptions";
import { RecurringPayment } from "../types/recurringPayment";
///
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import dayjs from "dayjs";
import PaymentStatus from "./PaymentStatus";
import RecurringPaymentMenu from "./RecurringPaymentMenu";
import Button from "@/shared/components/ui/Button";

//Extraact only label and value for SelectInput
const selectOptions = sortingOptions.map(({ label, value }) => ({
  label,
  value,
}));

export const columns: ColumnDef<RecurringPayment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "next_payment_date",
    header: "Next payment",
    cell: ({ row, getValue }) => {
      const payment = row.original;
      const dateStr = getValue() as Date;
      return (
        <div>
          {dayjs(dateStr).format("D MMMM YYYY")}
          <PaymentStatus payment={payment} />
        </div>
      );
    },
  },
  {
    accessorKey: "repeat",
    header: "Repeat",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;
      return <RecurringPaymentMenu payment={payment} />;
    },
  },
];

const RecurringPaymentsGrid: React.FC = () => {
  const { data = [], error } = useRecurringPayments();

  const { sortedItems, sortOption, handleSortingChange } = useSorting(
    data,
    sortingOptions,
    "Date",
  );

  //const hasPayments = data.length > 0;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error)
    return (
      <ErrorMessage
        variant="panel"
        message="Failed to load recurring payments."
      />
    );

  return (
    <div className="grow flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/recurring-payments/add-payment">
          <Button icon={<IdCard />} iconPosition="left" variant="secondary">
            Add payment
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">Sort by</span>
          <SelectInput
            id="sort"
            selectOptions={selectOptions}
            value={sortOption.value}
            onChange={(option) => handleSortingChange(option)}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
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
      <div className="flex gap-4 flex-wrap">
        {sortedItems.map((payment) => {
          return <RecurringPaymentItem key={payment.id} payment={payment} />;
        })}
      </div>
    </div>

    //   {!hasPayments && !error && (
    //     <p className={styles.noPayments}>No recurring payments found.</p>
    //   )}
    // </div>
  );
};

export default RecurringPaymentsGrid;
