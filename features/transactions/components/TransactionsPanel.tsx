import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";
//Hooks
import { useTransactions } from "../hooks/useTransactions";
//Types
import { Transaction } from "../types/transaction";
//Components
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TransactionsTableFilters from "./TransactionsTableFilters";
//Config
import { transactionsPanelColumns } from "../config/transactionsPanelColumns";
//Icons
import { ArrowUpRight } from "lucide-react";

const TransactionsPanel = () => {
  const { data: transactions, isLoading } = useTransactions();

  const table = useReactTable<Transaction>({
    data: transactions,
    columns: transactionsPanelColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility: {
        category: false, //This completely removes it from rendering while keeping filters alive!
      },
    },
  });

  if (isLoading) {
    return <DashboardPanelLoader height={467} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Recent transactions</h4>
        <div className="flex items-center gap-1">
          <TransactionsTableFilters table={table} />
          <Link
            href="/transactions"
            className={cn(
              "flex items-center gap-1 px-2.5 py-1.5 bg-background rounded-full",
              "",
            )}
          >
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>

      <Table>
        <TableHeader className="[&_tr]:border-b-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b-0 hover:bg-transparent"
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
                      "px-0 text-center first:text-left",
                      responsiveClass,
                    )}
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
            table
              .getRowModel()
              .rows.slice(0, 6)
              .map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b-0 hover:bg-transparent"
                >
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
                          "px-0 text-center first:text-left",
                          responsiveClass,
                        )}
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
                colSpan={transactionsPanelColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsPanel;
