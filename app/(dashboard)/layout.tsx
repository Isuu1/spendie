import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import Sidebar from "@/features/dashboard/components/Sidebar";
//import DashboardLayoutWrapper from "@/features/dashboard/layouts/DashboardLayoutWrapper";
import { AccountsProvider } from "@/shared/providers/AccountsProvider";
import { TransactionsProvider } from "@/shared/providers/TransactionsProvider";
import { UserProvider } from "@/shared/providers/UserProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserProvider>
        <TransactionsProvider>
          <AccountsProvider>
            <div
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <DashboardHeader />
              <div style={{ paddingLeft: "3rem", height: "100%" }}>
                <Sidebar />
                {children}
              </div>
            </div>
            {/* <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper> */}
          </AccountsProvider>
        </TransactionsProvider>
      </UserProvider>
    </div>
  );
}
