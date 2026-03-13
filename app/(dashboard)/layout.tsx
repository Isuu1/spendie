import { Toaster } from "react-hot-toast";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { QueryProvider } from "@/shared/providers/QueryProvider";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Components
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import Sidebar from "@/features/dashboard/components/Sidebar";
import DashboardLayoutWrapper from "@/features/dashboard/layouts/DashboardLayoutWrapper";
//Config
import { prefetchDashboard } from "@/features/dashboard/config/prefetchDashboard";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  // Prefetch all the data for the dashboard on the server side before rendering the page
  await prefetchDashboard(queryClient);

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
