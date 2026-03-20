import AccountsGrid from "@/features/accounts/components/AccountsGrid";
import AccountsMenu from "@/features/accounts/components/AccountsMenu";

export default function Page() {
  return (
    <>
      <h3>Accounts</h3>
      <AccountsMenu />
      <AccountsGrid />
    </>
  );
}
