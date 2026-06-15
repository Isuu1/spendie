import AccountsGrid from "@/features/accounts/components/AccountsGrid";
import AccountsMenu from "@/features/accounts/components/AccountsMenu";

export default function Page() {
  return (
    <div className="bg-card rounded-2xl p-6 flex flex-col gap-2">
      <h3>Accounts</h3>
      <p>All your linked accounts.</p>
      <AccountsMenu />
      <AccountsGrid />
    </div>
  );
}
