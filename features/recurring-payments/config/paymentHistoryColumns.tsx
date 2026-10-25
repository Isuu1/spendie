import { ColumnDef } from "@tanstack/react-table";
import { RecurringPaymentHistory } from "../types/recurringPayment";
import dayjs from "dayjs";
import PaymentHistoryStatus from "../components/PaymentHistoryStatus";
import { Amount } from "@/shared/components/Amount";

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
      return <Amount amount={amount} showTransactionColors />;
    },
  },
  {
    accessorKey: "payment_date",
    header: "Due by",
    cell: ({ getValue }) => {
      const dateStr = getValue() as Date;
      return <div>{dayjs(dateStr).format("D MMMM YYYY")}</div>;
    },
  },
  {
    accessorKey: "paid_date",
    header: "Paid date",
    cell: ({ getValue }) => {
      const dateStr = getValue() as Date;
      return <div>{dayjs(dateStr).format("D MMMM YYYY")}</div>;
    },
  },

  {
    id: "status",
    header: () => {
      return (
        <div>
          <span>Status</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex justify-center">
          <PaymentHistoryStatus paymentHistory={payment} />
        </div>
      );
    },
  },
];
