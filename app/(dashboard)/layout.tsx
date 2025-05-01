import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import { TransactionsProvider } from "@/shared/providers/TransactionsProvider";
import { UserProvider } from "@/shared/providers/UserProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserProvider>
        <TransactionsProvider>
          <DashboardHeader />
          {children}
        </TransactionsProvider>
      </UserProvider>
    </div>
  );
}
