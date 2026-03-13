"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserSettingsClient } from "../api/getUserSettingsClient";

export function useUserSettings() {
  return useQuery({
    queryKey: ["userSettings"],
    queryFn: getUserSettingsClient,
    staleTime: 1000 * 60, //1 minute
  });
}
