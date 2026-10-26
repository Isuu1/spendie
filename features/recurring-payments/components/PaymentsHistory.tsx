import React from "react";
//Hooks
import { useRecurringPaymentsHistory } from "../hooks/useRecurringPaymentsHistory";
import { useDeletePayment } from "../hooks/useDeletePaymentHistory";
//Types
import {
  RecurringPayment,
  RecurringPaymentHistory,
} from "../types/recurringPayment";
//Components
import ConfirmAction from "@/shared/components/ConfirmAction";
//Animations
import { AnimatePresence } from "motion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SegmentedControl from "@/shared/components/SegmentedControl";
import TablePagination from "@/shared/components/TablePagination";
//Config
import { columns } from "../config/paymentHistoryColumns";
import Button from "@/shared/components/ui/Button";

type PaymentsHistoryProps = {
  payment: RecurringPayment;
};

const PaymentsHistory = ({ payment }: PaymentsHistoryProps) => {
  const [confirmClear, setConfirmClear] = React.useState(false);
  const [sortedBy, setSortedBy] = React.useState("All");
  const { data = [], error } = useRecurringPaymentsHistory();
  const { mutate } = useDeletePayment();

  const handleDelete = (paymentId: string) => {
    mutate(paymentId);
    setConfirmClear(false);
  };

  const paymentHistory = React.useMemo(() => {
    return data.filter((history) => history.payment_id === payment.id);
  }, [data, payment.id]);

  //Filter history based on sortedBy state
  const filteredHistory = React.useMemo(() => {
    if (sortedBy === "Late") {
      return paymentHistory.filter((history) =>
        history.status.startsWith("Late"),
      );
    }
    if (sortedBy === "On time") {
      return paymentHistory.filter((history) => history.status === "On time");
    }

    return paymentHistory;
  }, [sortedBy, paymentHistory]);

  const table = useReactTable<RecurringPaymentHistory>({
    data: filteredHistory,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (error) {
    return <div>Error loading payment history</div>;
  }

  return (
    <div className="flex flex-col gap-5 mt-4">
      <div className="flex-row-space-between">
        <SegmentedControl
          options={[
            { label: "All", value: "All" },
            { label: "Late", value: "Late" },
            { label: "On time", value: "On time" },
          ]}
          onChange={setSortedBy}
        />
        <Button
          className="ml-auto cursor-pointer"
          onClick={() => setConfirmClear(true)}
          variant="destructive"
        >
          Clear history
        </Button>
      </div>
      <div>
        <Table className="rounded-2xl bg-background table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-background rounded-2xl"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="py-3 px-3 text-center first:text-left max-sm:px-1"
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-center first:text-left px-3 py-3 pl-3 max-sm:pl-2"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
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
      <AnimatePresence>
        {confirmClear && (
          <ConfirmAction
            title="Are you sure you want to clear the history?"
            onCancel={() => setConfirmClear(false)}
            onConfirm={() => handleDelete(payment.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentsHistory;
