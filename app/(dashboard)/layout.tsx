import { Toaster } from "react-hot-toast";

//Providers
import AppProviders from "@/shared/providers/AppProviders";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Components
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import Sidebar from "@/features/dashboard/components/Sidebar";
import DashboardLayoutWrapper from "@/features/dashboard/layouts/DashboardLayoutWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppProviders>
        <div id="confirm-action-root"></div>
        <div id="modal-root"></div>
        <Toaster toastOptions={toastStyle} containerStyle={{ top: 100 }} />
        <DashboardLayoutWrapper
          header={<DashboardHeader />}
          sidebar={<Sidebar />}
        >
          {children}
        </DashboardLayoutWrapper>
      </AppProviders>
    </div>
  );
}
