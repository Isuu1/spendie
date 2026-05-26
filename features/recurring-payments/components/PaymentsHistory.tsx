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
import Button from "@/shared/components/ui/Button";

import { columns } from "../config/paymentHistoryColumns";
import SegmentedControl from "@/shared/components/SegmentedControl";

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
        <p
          className="ml-auto cursor-pointer"
          onClick={() => setConfirmClear(true)}
        >
          Clear history
        </p>
      </div>
      <div>
        <Table className="mt-4 bg-card rounded-2xl">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-4">
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
                    <TableCell key={cell.id} className="py-5 px-4">
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
