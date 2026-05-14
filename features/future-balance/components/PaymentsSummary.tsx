import React from "react";

//Icons
import { TbArrowBigDownFilled } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { useFutureBalanceContext } from "../context/FutureBalanceContext";
import { AnimatePresence } from "motion/react";
import Modal from "@/shared/components/Modal";
import DashboardRecurringPaymentsGrid from "@/features/recurring-payments/components/DashboardRecurringPaymentsGrid";
import { cn } from "@/shared/lib/cn";
import { RecurringPayment } from "@/features/recurring-payments/types/recurringPayment";

type PaymentItemProps = {
  type: "income" | "expense";
  handleToggleDetails: (type: "income" | "expense" | null) => void;
  payments: RecurringPayment[];
  amount: number;
  icon?: React.ReactNode;
};

const PaymentItem = ({
  type,
  handleToggleDetails,
  payments,
  amount,
  icon,
}: PaymentItemProps) => {
  return (
    <div
      // className={clsx([
      //   styles.item,
      //   styles.income,
      //   detailsType === "income" ? styles.active : "",
      // ])}
      className={cn(
        "flex items-center gap-5 cursor-pointer w-fit rounded-lg p-3",
        type === "income" && "bg-[rgba(65,179,0,0.1)]",
        type === "expense" && "bg-[rgba(255,0,0,0.1)]",
      )}
      onClick={() => handleToggleDetails(type)}
    >
      <div
        //className={`${styles.iconWrapper} ${styles.incomeIconWrapper}`}
        className={cn(
          "w-fit rounded-sm p-2",
          type === "income" && "bg-[#42b30059]",
          type === "expense" && "bg-[#ff000059]",
        )}
      >
        <span
          //className={styles.icon}
          className={cn(
            type === "income" && "text-[#41b300]",
            type === "expense" && "text-red-600",
          )}
        >
          {icon}
        </span>
      </div>
      <div
        //className={styles.details}
        className="flex flex-col items-start gap-1"
      >
        <span>
          {payments.length}
          {` `}
          Income
        </span>
        <span
          //className={`${styles.amount} ${styles.income}`}
          className={cn(
            "text-sm font-medium",
            type === "income" && "text-green-600",
            type === "expense" && "text-red-600",
          )}
        >
          +£{amount.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

const PaymentsSummary = () => {
  const {
    incomePayments,
    expensePayments,
    incomeTotal,
    expenseTotal,
    detailsType,
    setDetailsType,
  } = useFutureBalanceContext();

  if (incomePayments.length === 0 && expensePayments.length === 0) {
    return (
      <div className="relative flex justify-between w-full gap-5">
        <p className="w-fit text-secondary">No upcoming changes</p>
      </div>
    );
  }

  const handleToggleDetails = (type: "income" | "expense" | null) => {
    if (detailsType === type) {
      setDetailsType(null);
    } else {
      setDetailsType(type);
    }
  };

  return (
    <>
      <AnimatePresence>
        {detailsType && (
          <Modal onClose={() => handleToggleDetails(null)}>
            <DashboardRecurringPaymentsGrid
              type={detailsType}
              toggleDetails={handleToggleDetails}
              payments={
                detailsType === "income" ? incomePayments : expensePayments
              }
            />
          </Modal>
        )}
      </AnimatePresence>
      <div
        //className={styles.upcomingPaymentsContainer}
        className="relative flex justify-between w-full gap-5"
      >
        {incomePayments.length > 0 && (
          <PaymentItem
            type="income"
            handleToggleDetails={handleToggleDetails}
            payments={incomePayments}
            amount={incomeTotal}
            icon={<TbArrowBigUpFilled />}
          />
          // <div
          //   // className={clsx([
          //   //   styles.item,
          //   //   styles.income,
          //   //   detailsType === "income" ? styles.active : "",
          //   // ])}
          //   className={cn(
          //     "flex items-center gap-5 cursor-pointer w-fit rounded-lg p-3",
          //   )}
          //   onClick={() => handleToggleDetails("income")}
          // >
          //   <div
          //     //className={`${styles.iconWrapper} ${styles.incomeIconWrapper}`}
          //     className={cn("w-fit rounded-sm p-2")}
          //   >
          //     <span
          //     //className={styles.icon}
          //     >
          //       <TbArrowBigUpFilled />
          //     </span>
          //   </div>
          //   <div
          //     //className={styles.details}
          //     className="flex flex-col items-start gap-1"
          //   >
          //     <span>
          //       {incomePayments.length}
          //       {` `}
          //       Income
          //     </span>
          //     <span className={`${styles.amount} ${styles.income}`}>
          //       +£{incomeTotal.toFixed(2)}
          //     </span>
          //   </div>
          // </div>
        )}
        {expensePayments.length > 0 && (
          <PaymentItem
            type="expense"
            handleToggleDetails={handleToggleDetails}
            payments={expensePayments}
            amount={expenseTotal}
            icon={<TbArrowBigDownFilled />}
          />
          // <div
          //   className={clsx([
          //     styles.item,
          //     styles.expense,
          //     detailsType === "expense" ? styles.active : "",
          //   ])}
          //   onClick={() => handleToggleDetails("expense")}
          // >
          //   <div
          //     className={`${styles.iconWrapper} ${styles.expenseIconWrapper}`}
          //   >
          //     <i className={styles.icon}>
          //       <TbArrowBigDownFilled />
          //     </i>
          //   </div>
          //   <div className={styles.details}>
          //     <span>
          //       {expensePayments.length}
          //       {` `}
          //       Expense
          //     </span>
          //     <span className={`${styles.amount} ${styles.expense}`}>
          //       -£{expenseTotal.toFixed(2)}
          //     </span>
          //   </div>
          // </div>
        )}
      </div>
    </>
  );
};

export default PaymentsSummary;
