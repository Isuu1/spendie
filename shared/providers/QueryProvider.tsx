// shared/providers/QueryProvider.tsx
"use client";

import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";

interface QueryProviderProps {
  children: React.ReactNode;
  state?: unknown;
}

export function QueryProvider({ children, state }: QueryProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
