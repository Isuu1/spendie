import { ColumnDef } from "@tanstack/react-table";
import { RecurringPaymentHistory } from "../types/recurringPayment";
import dayjs from "dayjs";
import PaymentHistoryStatus from "../components/PaymentHistoryStatus";

export const columns: ColumnDef<RecurringPaymentHistory>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => {
      const amount = getValue() as number;
      return <span>£{amount.toFixed(2)}</span>;
    },
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
