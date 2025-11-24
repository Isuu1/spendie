import UserLayout from "@/features/user/layouts/UserLayout";
import BackButton from "@/shared/components/BackButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackButton text="Settings" />
      <UserLayout>{children}</UserLayout>
    </>
  );
}
