import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import DashboardLayoutWrapper from "@/features/dashboard/layouts/DashboardLayoutWrapper";
import { TransactionsProvider } from "@/shared/providers/TransactionsProvider";
import { UserProvider } from "@/shared/providers/UserProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserProvider>
        <TransactionsProvider>
          <DashboardHeader />
          <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
        </TransactionsProvider>
      </UserProvider>
    </div>
  );
}
