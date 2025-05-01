"use client";

import { createClient } from "@/supabase/client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Transaction } from "../types/transaction";

interface TransactionsContextType {
  transactions: Transaction[] | null;
}

export const TransactionsContext =
  createContext<TransactionsContextType | null>(null);

export const TransactionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const supabase = createClient();

  const fetchTransactions = useCallback(async () => {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error("Error fetching user:", authError);
      return null;
    }
    const { data: transactionsData, error: profileError } = await supabase
      .from("transactions")
      .select("id, amount, date, category, type")
      .eq("user_id", authData.user.id)
      .limit(10);

    if (profileError) {
      console.error("Error fetching profile data:", profileError);
      return null;
    }

    setTransactions(transactionsData);
  }, [supabase]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
