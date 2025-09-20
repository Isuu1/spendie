import { getUserServer } from "@/features/user/api/getUserServer";
import AccountDetails from "@/features/user/components/AccountDetails";
import ErrorMessage from "@/shared/components/ErrorMessage";
import PageWrapper from "@/shared/components/PageWrapper";

export default async function Page() {
  const { user, error } = await getUserServer();

  console.log("Fetched user:", user, error);

  if (error || !user) {
    return (
      <PageWrapper>
        <h3>Account</h3>
        <ErrorMessage message="Failed to load your account from the server." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <h3>Account</h3>
      <AccountDetails user={user} />
    </PageWrapper>
  );
}
