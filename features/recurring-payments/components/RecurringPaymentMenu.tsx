import HamburgerMenu from "@/shared/components/HamburgerMenu";
import Link from "next/link";
import React, { useState } from "react";
import { RecurringPayment } from "../types/recurring-payment";
import Button from "@/shared/components/ui/Button";
import { FaPlusSquare } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { deleteRecurringPayment } from "../lib/actions/delete-recurring-payment";
import { toast } from "react-hot-toast";
import ConfirmAction from "@/shared/components/ConfirmAction";
//Styles
import styles from "./RecurringPaymentMenu.module.scss";

interface RecurringPaymentMenuProps {
  payment: RecurringPayment;
}

const RecurringPaymentMenu: React.FC<RecurringPaymentMenuProps> = ({
  payment,
}) => {
  const [confirmDeletePayment, setConfirmDeletePayment] = useState<
    string | null
  >(null);

  const handleDeletePayment = async (paymentId: string) => {
    const result = await deleteRecurringPayment(paymentId);
    if (result.success) {
      toast.success("Payment deleted successfully!");
    }
    if (result.error) {
      toast.error(`Failed to delete payment: ${result.error}`);
    }
    setConfirmDeletePayment(null);
  };

  return (
    <>
      <HamburgerMenu position="right">
        <Link href={`/recurring-payments/edit-payment/${payment.id}`}>
          <Button
            variant="secondary"
            size="small"
            type="button"
            text="Edit"
            icon={<FaPlusSquare />}
            iconPosition="left"
          />
        </Link>
        <Button
          className={styles.deleteButton}
          variant="secondary"
          size="small"
          type="button"
          text="Delete"
          icon={<IoTrashBin />}
          iconPosition="left"
          onClick={() => setConfirmDeletePayment(payment.id)}
        />
        {confirmDeletePayment && (
          <ConfirmAction
            message="Delete payment?"
            onCancel={() => setConfirmDeletePayment(null)}
            onConfirm={() => handleDeletePayment(payment.id)}
          />
        )}
      </HamburgerMenu>
    </>
  );
};

export default RecurringPaymentMenu;
