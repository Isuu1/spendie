"use client";

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
import Button from "@/shared/components/ui/Button";
//Config
import { transactionsColumns } from "../config/transactionsColumns";
import Input from "@/shared/components/ui/Input";
import { ListFilter, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import Checkbox from "@/shared/components/ui/Checkbox";

const CATEGORIES = [
  { value: "FOOD_AND_DRINK", label: "Food and drink" },
  { value: "SHOPPING", label: "Shopping" },
  { value: "BILLS", label: "Bills" },
  { value: "TRAVEL", label: "Travel" },
  { value: "TRANSPORTATION", label: "Transportation" },
  { value: "LOANS", label: "Loans" },
];

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
  });

  // 1. Grab the column API directly
  const categoryColumn = table.getColumn("category");
  // 2. Safely read its current filter array (fallback to empty array)
  const activeFilters = (categoryColumn?.getFilterValue() as string[]) ?? [];

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
        <Popover>
          <PopoverTrigger className="w-fit justify-self-end">
            <Button
              icon={<ListFilter />}
              iconPosition="left"
              variant="secondary"
              size="sm"
              className="rounded-full bg-background"
            >
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={16}
            className="border border-card-foreground"
          >
            {CATEGORIES.map((cat) => (
              <Checkbox
                key={cat.value}
                id={cat.value}
                label={cat.label}
                checked={activeFilters.includes(cat.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    categoryColumn?.setFilterValue([
                      ...activeFilters,
                      cat.value,
                    ]);
                  } else {
                    categoryColumn?.setFilterValue(
                      activeFilters.filter((v) => v !== cat.value),
                    );
                  }
                }}
              />
            ))}
            {activeFilters.length > 0 && (
              <Button
                variant="default"
                size="sm"
                onClick={() => categoryColumn?.setFilterValue(undefined)}
              >
                Clear Filters
              </Button>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <Table className="bg-background table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-background rounded-2xl"
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
      <div className="flex items-center justify-start space-x-2 py-4">
        <Button
          className="bg-background"
          variant="secondary"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          className="bg-background"
          variant="secondary"
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
