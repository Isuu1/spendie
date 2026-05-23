import React from "react";
//Styles
import styles from "./RecurringPaymentsHistory.module.scss";
//Hooks
import { useRecurringPaymentsHistory } from "../hooks/useRecurringPaymentsHistory";
import { usePagination } from "@/shared/hooks/usePagination";
import { useDeletePayment } from "../hooks/useDeletePaymentHistory";
//Types
import {
  RecurringPayment,
  RecurringPaymentHistory,
} from "../types/recurringPayment";
//Components
import Pagination from "@/shared/components/Pagination";
import ConfirmAction from "@/shared/components/ConfirmAction";
import RecurringPaymentsHistoryItem from "./RecurringPaymentsHistoryItem";
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
//import RecurringPaymentMenu from "./RecurringPaymentMenu";
import dayjs from "dayjs";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PaymentHistoryStatus from "./PaymentHistoryStatus";

export const columns: ColumnDef<RecurringPaymentHistory>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "payment_date",
    header: "Due by",
    cell: ({ getValue }) => {
      // const payment = row.original;
      const dateStr = getValue() as Date;
      return (
        <div>
          {dayjs(dateStr).format("D MMMM YYYY")}
          {/* <PaymentStatus payment={payment} /> */}
        </div>
      );
    },
  },
  {
    accessorKey: "paid_date",
    header: "Paid date",
    cell: ({ getValue }) => {
      // const payment = row.original;
      const dateStr = getValue() as Date;
      return <div>{dayjs(dateStr).format("D MMMM YYYY")}</div>;
    },
  },

  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const payment = row.original;
      return <PaymentHistoryStatus paymentHistory={payment} />;
    },
  },
];

interface RecurringPaymentsHistoryProps {
  payment: RecurringPayment;
}

const RecurringPaymentsHistory: React.FC<RecurringPaymentsHistoryProps> = ({
  payment,
}) => {
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

  const { page, setPage, totalPages, currentItems } = usePagination(
    filteredHistory,
    4,
  );

  //Reset to page 1 when sortedBy changes
  React.useEffect(() => {
    setPage(1);
  }, [sortedBy, setPage]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return <div>Error loading payment history</div>;
  }

  // if (paymentHistory.length === 0) {
  //   return (
  //     <div className={styles.historyWrapper}>
  //       <p>
  //         Looks like you don`t have any payment history for {payment.name} yet.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className={styles.historyWrapper}>
        <div className="flex-row-space-between">
          <ul className={styles.menu}>
            <li
              className={sortedBy === "All" ? styles.active : ""}
              onClick={() => setSortedBy("All")}
            >
              All
            </li>
            <li
              className={sortedBy === "Late" ? styles.active : ""}
              onClick={() => setSortedBy("Late")}
            >
              Late
            </li>
            <li
              className={sortedBy === "On time" ? styles.active : ""}
              onClick={() => setSortedBy("On time")}
            >
              On time
            </li>
          </ul>
          <p className={styles.clear} onClick={() => setConfirmClear(true)}>
            Clear history
          </p>
        </div>

        {filteredHistory.length === 0 ? (
          <p className={styles.noResults}>
            Could not find any payments matching the selected filter. Try
            changing the filter or check back later when more payments have been
            made.
          </p>
        ) : (
          <div className={styles.historyContainer}>
            <ul className={styles.historyHeader}>
              <li></li>
              <li>Amount</li>
              <li>Due by</li>
              <li>Paid date</li>
              <li>Status</li>
            </ul>
            {currentItems.map((history) => (
              <RecurringPaymentsHistoryItem
                key={`${history.id}-${history.payment_date}`}
                payment={history}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            page={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        )}

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
      <div>
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
      </div>
    </>
  );
};

export default RecurringPaymentsHistory;
