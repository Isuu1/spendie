import { dehydrate, QueryClient } from "@tanstack/react-query";
import { QueryProvider } from "@/shared/providers/QueryProvider";
//Components
import ErrorMessage from "@/shared/components/ErrorMessage";
import Dashboard from "@/features/dashboard/components/Dashboard";
//Api
import { getUserSettingsServer } from "@/features/user/api/getUserSettingsServer";
import { getAccountsServer } from "@/features/accounts/api/server";

export default async function Page() {
  const queryClient = new QueryClient();

  const { settings, error: settingsError } = await getUserSettingsServer();
  const { accounts, error: accountsError } = await getAccountsServer();

  if (settingsError || accountsError) {
    return (
      <>
        <h3>Account</h3>
        <ErrorMessage message="Failed to load your account settings from the server." />
      </>
    );
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

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <QueryProvider state={dehydratedState}>
        <Dashboard />
      </QueryProvider>
    </>
  );
}
