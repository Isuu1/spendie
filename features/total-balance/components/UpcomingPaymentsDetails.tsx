import { RecurringPayment } from "@/shared/types/recurring-payment";
import React from "react";

interface UpcomingPaymentsDetailsProps {
  toggleDetails?: (type: "income" | "expense" | null) => void;
  paymentsTillDate?: RecurringPayment[];
}

const UpcomingPaymentsDetails: React.FC<UpcomingPaymentsDetailsProps> = ({
  toggleDetails,
  paymentsTillDate,
}) => {
  console.log("toggleDetails:", toggleDetails);
  console.log("paymentsTillDate:", paymentsTillDate);
  return <div>UpcomingPaymentsDetails</div>;
};

export default UpcomingPaymentsDetails;
