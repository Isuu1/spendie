import { getUserServer } from "@/features/user/api/getUserServer";
import AccountDetails from "@/features/user/components/AccountDetails";
import ErrorMessage from "@/shared/components/ErrorMessage";

export default async function Page() {
  const { user, error } = await getUserServer();

  console.log("Fetched user:", user, error);

  if (error || !user) {
    return (
      <>
        <h3>Account</h3>
        <ErrorMessage
          variant="panel"
          message="Failed to load your account from the server."
        />
      </>
    );
  }

  return (
    <>
      <h3>Account</h3>
      <AccountDetails user={user} />
    </>
  );
}
