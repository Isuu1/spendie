import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
//Types
import { RecurringPayment } from "../types/recurring-payment";
//Actions
import { deleteRecurringPayment } from "../lib/actions/delete-recurring-payment";
//Styles
import styles from "./RecurringPaymentMenu.module.scss";
//Animations
import { AnimatePresence } from "motion/react";
//Icons
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
//Components
import HamburgerMenu from "@/shared/components/HamburgerMenu";
import ConfirmAction from "@/shared/components/ConfirmAction";

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
        <li className={`${styles.menuItem}`}>
          <FaEdit className={styles.icon} />
          <Link href={`/recurring-payments/edit-payment/${payment.id}`}>
            Edit payment
          </Link>
        </li>
        <li
          className={`${styles.menuItem} ${styles.deleteItem}`}
          onClick={() => setConfirmDeletePayment(payment.id)}
        >
          <IoTrashBin className={styles.icon} />
          Delete payment
        </li>
      </HamburgerMenu>
      <AnimatePresence>
        {confirmDeletePayment && (
          <ConfirmAction
            message="Delete payment?"
            onCancel={() => setConfirmDeletePayment(null)}
            onConfirm={() => handleDeletePayment(payment.id)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RecurringPaymentMenu;
