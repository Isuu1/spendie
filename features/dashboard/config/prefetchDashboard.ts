import { getAccountsServer } from "@/features/accounts/api/getAccountsServer";
import { getRecurringPaymentsHistoryServer } from "@/features/recurring-payments/api/getRecurringPaymentsHistoryServer";
import { getRecurringPaymentsServer } from "@/features/recurring-payments/api/getRecurringPaymentsServer";
import { getTransactionsServer } from "@/features/transactions/api/getTransactionsServer";
import { getUserServer } from "@/features/user/api/getUserServer";
import { getUserSettingsServer } from "@/features/user/api/getUserSettingsServer";
import { QueryClient } from "@tanstack/react-query";

export async function prefetchDashboard(queryClient: QueryClient) {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["recurringPayments"],
      queryFn: getRecurringPaymentsServer,
    }),

    queryClient.prefetchQuery({
      queryKey: ["accounts"],
      queryFn: getAccountsServer,
    }),

    queryClient.prefetchQuery({
      queryKey: ["userSettings"],
      queryFn: getUserSettingsServer,
    }),

    queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: getUserServer,
    }),

    queryClient.prefetchQuery({
      queryKey: ["paymentsHistory"],
      queryFn: getRecurringPaymentsHistoryServer,
    }),

    queryClient.prefetchQuery({
      queryKey: ["transactions"],
      queryFn: getTransactionsServer,
    }),
  ]);
}
