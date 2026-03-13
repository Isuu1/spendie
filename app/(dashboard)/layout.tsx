import { Toaster } from "react-hot-toast";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Components
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import Sidebar from "@/features/dashboard/components/Sidebar";
import DashboardLayoutWrapper from "@/features/dashboard/layouts/DashboardLayoutWrapper";
//Api
import { getUserSettingsServer } from "@/features/user/api/getUserSettingsServer";
import { getAccountsServer } from "@/features/accounts/api/getAccountsServer";
import { getRecurringPaymentsServer } from "@/features/recurring-payments/api/getRecurringPaymentsServer";
import { getRecurringPaymentsHistoryServer } from "@/features/recurring-payments/api/getRecurringPaymentsHistoryServer";
import { getTransactionsServer } from "@/features/transactions/api/getTransactionsServer";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { getUserServer } from "@/features/user/api/getUserServer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["recurringPayments"],
    queryFn: getRecurringPaymentsServer,
  });

  await queryClient.prefetchQuery({
    queryKey: ["accounts"],
    queryFn: getAccountsServer,
  });

  await queryClient.prefetchQuery({
    queryKey: ["userSettings"],
    queryFn: getUserSettingsServer,
  });

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUserServer,
  });

  await queryClient.prefetchQuery({
    queryKey: ["paymentsHistory"],
    queryFn: getRecurringPaymentsHistoryServer,
  });

  await queryClient.prefetchQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsServer,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div style={{ height: "100vh" }}>
      <QueryProvider state={dehydratedState}>
        <div id="confirm-action-root"></div>
        <div id="modal-root"></div>
        <Toaster toastOptions={toastStyle} containerStyle={{ top: 100 }} />
        <DashboardLayoutWrapper
          header={<DashboardHeader />}
          sidebar={<Sidebar />}
        >
          {children}
        </DashboardLayoutWrapper>
      </QueryProvider>
    </div>
  );
}
