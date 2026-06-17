import PaymentsGrid from "@/features/recurring-payments/components/PaymentsGrid";

export default async function Page() {
  return (
    <div className="bg-card rounded-2xl p-6 flex flex-col gap-2">
      <h3>Recurring payments</h3>
      <p>All recurring payments will be displayed here.</p>
      <PaymentsGrid />
    </div>
  );
}
