import { ColumnDef } from "@tanstack/react-table";
import { RecurringPayment } from "../types/recurringPayment";
import dayjs from "dayjs";
import { Amount } from "@/shared/components/Amount";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Button from "@/shared/components/ui/Button";

type ColumnsProps = {
  handleMarkAsPaid: (payment: RecurringPayment) => void;
  isPending: boolean;
  variables?: { id: number };
};

export const getColumns = ({
  handleMarkAsPaid,
  isPending,
  variables,
}: ColumnsProps): ColumnDef<RecurringPayment>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row }) => {
      const name = getValue() as string;
      const accountName = row.original.accounts?.name;
      const userAccountName = row.original.accounts?.user_account_name;

      console.log("row.original", row.original);
      console.log("id type of", typeof row.original.id);

      return (
        <div
          className="flex items-center gap-3 min-w-40 max-w-70 truncate"
          title={name}
        >
          <div className="flex flex-col items-start gap-1">
            <strong>{name}</strong>
            <p className="text-xs text-secondary">
              {userAccountName || accountName}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "next_payment_date",
    header: "Next payment date",
    cell: ({ getValue }) => {
      const date = getValue() as Date;

      return <div>{dayjs(date).format("D MMMM YYYY")}</div>;
    },
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;
      console.log("variables", variables);
      console.log("payment", payment);
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="cursor-pointer! hover:bg-[#ffffff1f] rounded-sm p-1"
            >
              <EllipsisVertical size={28} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="relative z-99">
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Button
                  variant="ghost"
                  className="p-0 hover:bg-transparent"
                  size="xs"
                  onClick={() => handleMarkAsPaid(payment)}
                  disabled={isPending && variables?.id === payment.id}
                >
                  {isPending && variables?.id === payment.id
                    ? "Processing..."
                    : "Mark as paid"}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
