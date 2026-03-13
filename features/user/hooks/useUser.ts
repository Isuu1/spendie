"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserClient } from "../api/getUserClient";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserClient,
    staleTime: 1000 * 60, // 1 minute
  });
}
