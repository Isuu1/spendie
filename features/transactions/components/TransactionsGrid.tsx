"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
//Hooks
import { useTransactions } from "../hooks/useTransactions";
//Types
import { Transaction } from "../types/transaction";
//Components
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Input from "@/shared/components/ui/Input";
import TransactionsTableFilters from "./TransactionsTableFilters";
import TablePagination from "@/shared/components/TablePagination";
//Config
import { transactionsColumns } from "../config/transactionsColumns";
//Icons
import { Search } from "lucide-react";

const TransactionsGrid = () => {
  const { data: transactions } = useTransactions();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable<Transaction>({
    data: transactions,
    columns: transactionsColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility: {
        category: false, // This completely removes it from rendering while keeping filters alive!
      },
    },
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 15, // Display 15 items per page
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2">
        <Input
          id="search"
          label="Search transactions"
          labelHidden
          icon={<Search />}
          placeholder="Search transactions..."
          className="bg-background rounded-full"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
        <TransactionsTableFilters table={table} />
      </div>
      <Table className="bg-background table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-background rounded-2xl"
            >
              {headerGroup.headers.map((header) => {
                //Extract the meta class from columns config string if it exists
                const columnMeta = header.column.columnDef.meta as {
                  className?: string;
                };
                const responsiveClass = columnMeta?.className || "";
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "py-3 px-3 text-center first:text-left max-sm:px-1",
                      responsiveClass,
                    )}
                    style={{
                      width:
                        header.id === "name" ? "auto" : `${header.getSize()}px`,
                    }}
                  >
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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  //Extract the exact same meta class string for the body cell
                  const columnMeta = cell.column.columnDef.meta as {
                    className?: string;
                  };
                  const responsiveClass = columnMeta?.className || "";
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "text-center first:text-left px-0 py-3 pl-3 max-sm:pl-2",
                        responsiveClass,
                      )}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={transactionsColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination table={table} />
    </div>
  );
};

export default TransactionsGrid;
