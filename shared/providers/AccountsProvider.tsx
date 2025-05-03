"use client";

import { createClient } from "@/supabase/client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Account } from "../types/account";

interface AccountsContextType {
  accounts: Account[] | null;
}

export const AccountsContext = createContext<AccountsContextType | null>(null);

export const AccountsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accounts, setAccounts] = useState<Account[] | null>(null);

  const supabase = createClient();

  const fetchAccounts = useCallback(async () => {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error("Error fetching user:", authError);
      return null;
    }
    // const { data: accountsData, error: profileError } = await supabase
    //   .from("accounts")
    //   .select("id, name, total_balance, type, cards")
    //   .eq("user_id", authData.user.id)
    //   .limit(10);

    // if (profileError) {
    //   console.error("Error fetching profile data:", profileError);
    //   return null;
    // }

    const response = await fetch("/api/plaid/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: authData.user.id }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch accounts");
    }
    const accountsData: Account[] = await response.json();
    if (!accountsData) {
      console.error("Error fetching accounts data");
      return null;
    }

    setAccounts(accountsData);
  }, [supabase]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  console.log("Accounts fetched:", accounts);

  return (
    <AccountsContext.Provider value={{ accounts }}>
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
