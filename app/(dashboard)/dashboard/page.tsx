//Components
import Dashboard from "@/features/dashboard/components/Dashboard";
import DashboardOptions from "@/features/dashboard/components/DashboardOptions";

export default async function Page() {
  return (
    <>
      <DashboardOptions />
      <Dashboard />
    </>
  );
}
