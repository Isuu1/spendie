"use client";

import React, { useState } from "react";
import { createContext } from "react";
import { RecurringPayment } from "../../features/recurring-payments/types/recurring-payment";

interface RecurringPaymentsContextType {
  payments: RecurringPayment[];
}

export const RecurringPaymentsContext =
  createContext<RecurringPaymentsContextType | null>(null);

const RecurringPaymentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [payments] = useState<RecurringPayment[]>([]);

  return (
    <RecurringPaymentsContext.Provider value={{ payments }}>
      {children}
    </RecurringPaymentsContext.Provider>
  );
};

export default RecurringPaymentsProvider;
