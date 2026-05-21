import React from "react";
import dayjs from "dayjs";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurringPayment";
//Components
import PaymentStatus from "@/features/recurring-payments/components/PaymentStatus";
import Button from "@/shared/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//Hooks
import { useMarkAsPaid } from "../hooks/useMarkAsPaid";
//Icons
import { EllipsisVertical } from "lucide-react";

type RecurringPaymentItemProps = {
  payment: RecurringPayment;
};

const DashboardRecurringPaymentItem = ({
  payment,
}: RecurringPaymentItemProps) => {
  const { mutate, isPending, variables } = useMarkAsPaid();

  const handleMarkAsPaid = async (payment: RecurringPayment) => {
    mutate(payment);
  };

  return (
    <TableRow className="hover:bg-card">
      <TableCell>{payment.name}</TableCell>
      <TableCell>
        {dayjs(payment.next_payment_date).format("D MMMM YYYY")}
        <PaymentStatus payment={payment} />
      </TableCell>
      <TableCell>{payment.repeat}</TableCell>
      <TableCell className="text-right">
        {payment.type === "Income" ? "+£" : "-£"}
        {payment.amount.toFixed(2)}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="cursor-pointer! hover:bg-[#ffffff1f] rounded-sm p-1"
          >
            <EllipsisVertical size={28} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative z-99">
            <DropdownMenuItem>
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
      </TableCell>
    </TableRow>
  );
};

export default DashboardRecurringPaymentItem;
