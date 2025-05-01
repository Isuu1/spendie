import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import DashboardLayoutWrapper from "@/features/dashboard/layouts/DashboardLayoutWrapper";
import { AccountsProvider } from "@/shared/providers/AccountsProvider";
import { TransactionsProvider } from "@/shared/providers/TransactionsProvider";
import { UserProvider } from "@/shared/providers/UserProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserProvider>
        <TransactionsProvider>
          <AccountsProvider>
            <DashboardHeader />
            <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
          </AccountsProvider>
        </TransactionsProvider>
      </UserProvider>
    </div>
  );
}
