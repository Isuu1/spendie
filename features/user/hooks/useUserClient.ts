"use client";

import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useUserClient() {
  const supabase = createClient();
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { error, data } = await supabase.auth.getUser();

      if (error || !data.user) {
        console.error("Error fetching user:", error);
        return null;
      }

      const { data: userProfile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        return null;
      }

      return userProfile;
    },
  });
}
