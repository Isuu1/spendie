import { Toaster } from "react-hot-toast";

//Providers
import AppProviders from "@/shared/providers/AppProviders";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Components
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import Sidebar from "@/features/dashboard/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppProviders>
        <div id="confirm-action-root"></div>
        <div
          style={{
            zIndex: 98,
            position: "relative",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Toaster toastOptions={toastStyle} containerStyle={{ top: 100 }} />
          <DashboardHeader />
          <div style={{ paddingLeft: "3rem", height: "100%" }}>
            <Sidebar />
            {children}
          </div>
        </div>
      </AppProviders>
    </div>
  );
}
