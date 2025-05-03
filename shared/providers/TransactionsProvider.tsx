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

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     if (!user) return;

  //     try {
  //       //setLoading(true);
  //       const response = await fetch("/api/plaid/transactions", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ userId: user.id }),
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.error || "Failed to fetch transactions");
  //       }

  //       const data: Transaction[] = await response.json();
  //       setTransactions(data);
  //     } catch (err: any) {
  //       //setError(err.message);
  //       console.error("Error fetching transactions:", err);
  //     } finally {
  //       //setLoading(false);
  //     }
  //   };

  //   fetchTransactions();
  // }, [user]); // Refetch if user changes

  // console.log("Transactions:", transactions);

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
