import UserLayout from "@/features/user/layouts/UserLayout";
import BackButton from "@/shared/components/BackButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex-row">
        <BackButton text="Settings" />
      </div>
      <UserLayout>{children}</UserLayout>
    </>
  );
}
