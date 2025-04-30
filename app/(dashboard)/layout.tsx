import DashboardHeader from "@/features/dashboard/components/DashboardHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  );
}
