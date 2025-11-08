import { dehydrate, QueryClient } from "@tanstack/react-query";
import { QueryProvider } from "@/shared/providers/QueryProvider";
//Components
import Dashboard from "@/features/dashboard/components/Dashboard";
//Api
import { getUserSettingsServer } from "@/features/user/api/getUserSettingsServer";
import { getAccountsServer } from "@/features/accounts/api/getAccountsServer";
import { getRecurringPaymentsServer } from "@/features/recurring-payments/api/getRecurringPaymentsServer";
import { getRecurringPaymentsHistoryServer } from "@/features/recurring-payments/api/getRecurringPaymentsHistoryServer";
import { getTransactionsServer } from "@/features/transactions/api/getTransactionsServer";

export default async function Page() {
  const queryClient = new QueryClient();

  const { settings, error: settingsError } = await getUserSettingsServer();
  const { accounts, error: accountsError } = await getAccountsServer();
  const { recurringPayments, error: recurringPaymentsError } =
    await getRecurringPaymentsServer();
  const { paymentsHistory, error: historyError } =
    await getRecurringPaymentsHistoryServer();

  const { transactions, error: transactionsError } =
    await getTransactionsServer();

  if (
    settingsError ||
    accountsError ||
    recurringPaymentsError ||
    historyError ||
    transactionsError
  ) {
    console.error("Error loading dashboard data:", {
      settingsError,
      accountsError,
      recurringPaymentsError,
      historyError,
      transactionsError,
    });
  }

  // Prefill React Query cache
  await queryClient.prefetchQuery({
    queryKey: ["userSettings"],
    queryFn: () => Promise.resolve(settings),
  });

  await queryClient.prefetchQuery({
    queryKey: ["accounts"],
    queryFn: () => Promise.resolve(accounts),
  });

  await queryClient.prefetchQuery({
    queryKey: ["recurringPayments"],
    queryFn: () => Promise.resolve(recurringPayments),
  });

  await queryClient.prefetchQuery({
    queryKey: ["paymentsHistory"],
    queryFn: () => Promise.resolve(paymentsHistory),
  });

  await queryClient.prefetchQuery({
    queryKey: ["transactions"],
    queryFn: () => Promise.resolve(transactions),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <QueryProvider state={dehydratedState}>
        <Dashboard />
      </QueryProvider>
    </>
  );
}
