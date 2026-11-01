"use client";

import dayjs from "dayjs";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurringPayment";
//Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AnimatedTabs from "@/features/recurring-payments/components/AnimatedTabs";
import TablePagination from "@/shared/components/TablePagination";
//Config
import { getColumns } from "../config/dashboardPaymentsColumns";
//Hooks
import { useMarkAsPaid } from "../hooks/useMarkAsPaid";

type DashboardPaymentsGridProps = {
  type: "income" | "expense";
  toggleDetails: (type: "income" | "expense" | null) => void;
  payments: RecurringPayment[];
  selectedDate: dayjs.Dayjs | null;
};

const DashboardPaymentsGrid = ({
  type,
  toggleDetails,
  payments,
  selectedDate,
}: DashboardPaymentsGridProps) => {
  const { mutate, isPending, variables } = useMarkAsPaid();

  const handleMarkAsPaid = async (payment: RecurringPayment) => {
    mutate(payment);
  };

  const columns = getColumns({
    handleMarkAsPaid,
    isPending,
    variables,
  });

  const table = useReactTable<RecurringPayment>({
    data: payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 6, // Display 6 items per page
      },
    },
  });

  return (
    <>
      <AnimatedTabs type={type} toggleDetails={toggleDetails} />

      {payments.length === 0 ? (
        <p className="text-center p2 text-secondary">
          No upcoming payments by{" "}
          {selectedDate
            ? `${selectedDate.format("DD MMM YYYY")}`
            : "end of month"}
        </p>
      ) : (
        <Table>
          <TableCaption>
            A list of your upcoming payments by{" "}
            {selectedDate
              ? `${selectedDate.format("DD MMM YYYY")}`
              : "end of month"}
            .
          </TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
              : null}
          </TableBody>
        </Table>
      )}

      <TablePagination table={table} />
    </>
  );
};

export default DashboardPaymentsGrid;
