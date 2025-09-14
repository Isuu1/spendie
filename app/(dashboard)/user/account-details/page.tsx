import { getUserServer } from "@/features/user/api/getUserServer";
import AccountDetails from "@/features/user/components/AccountDetails";
import PageWrapper from "@/shared/components/PageWrapper";

export default async function Page() {
  const user = await getUserServer();

  return (
    <PageWrapper>
      <h3>Account</h3>
      <AccountDetails user={user} />
    </PageWrapper>
  );
}
