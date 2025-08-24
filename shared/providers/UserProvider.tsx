"use client";

import { createClient } from "@/supabase/client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserProfile } from "../../features/user/types/user";
import { RecurringPayment } from "../types/recurring-payment";

interface UserContextType {
  user: {
    id: string;
    email: string;
    username: string;
    avatar: string;
    standing_orders: RecurringPayment[];
  };
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile>({
    id: "",
    email: "",
    username: "",
    avatar: "",
    standing_orders: [],
  });

  const supabase = createClient();

  const fetchUser = useCallback(async () => {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error("Error fetching user:", authError);
      return null;
    }
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, email, username, avatar, recurring_payments")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile data:", profileError);
      return null;
    }

    setUser({
      id: profileData.id,
      email: profileData.email,
      username: profileData.username,
      avatar: profileData.avatar,
      standing_orders: profileData.recurring_payments,
    });
  }, [supabase]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
