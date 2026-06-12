import TransactionsGrid from "@/features/transactions/components/TransactionsGrid";

export default function Page() {
  return (
    <div className="bg-card rounded-2xl p-6">
      <div className="flex flex-col gap-2 mb-4">
        <h3>Transactions</h3>
        <p>All your transactions from the last 90 days.</p>
      </div>
      <TransactionsGrid />
    </div>
  );
}
