//Icons
import { TbArrowBigDownFilled } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";
//Context
import { useFutureBalanceContext } from "../context/FutureBalanceContext";
//Animations
import { AnimatePresence } from "motion/react";
//Components
import Modal from "@/shared/components/Modal";
import DashboardPaymentsGrid from "@/features/recurring-payments/components/DashboardPaymentsGrid";
import PaymentSummaryItem from "./PaymentSummaryItem";

const PaymentsSummary = () => {
  const {
    incomePayments,
    expensePayments,
    incomeTotal,
    expenseTotal,
    detailsType,
    setDetailsType,
    selectedDate,
  } = useFutureBalanceContext();

  if (incomePayments.length === 0 && expensePayments.length === 0) {
    return (
      <p className="w-full text-center text-secondary">No upcoming changes</p>
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
            <DashboardPaymentsGrid
              type={detailsType}
              toggleDetails={handleToggleDetails}
              payments={
                detailsType === "income" ? incomePayments : expensePayments
              }
              selectedDate={selectedDate}
            />
          </Modal>
        )}
      </AnimatePresence>
      <div className="relative flex flex-col w-full gap-3">
        {incomePayments.length > 0 && (
          <PaymentSummaryItem
            type="income"
            handleToggleDetails={handleToggleDetails}
            payments={incomePayments}
            amount={incomeTotal}
            icon={<TbArrowBigUpFilled />}
          />
        )}
        {expensePayments.length > 0 && (
          <PaymentSummaryItem
            type="expense"
            handleToggleDetails={handleToggleDetails}
            payments={expensePayments}
            amount={expenseTotal}
            icon={<TbArrowBigDownFilled />}
          />
        )}
      </div>
    </>
  );
};

export default PaymentsSummary;
