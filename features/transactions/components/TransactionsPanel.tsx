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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
          <Link
            href="/transactions"
            className={cn(
              "flex items-center gap-1 px-2.5 py-1.5 bg-background rounded-full hover:bg-card-foreground transition-all",
              "",
            )}
          >
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>

      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.slice(0, 6)
              .map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b hover:bg-transparent"
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
