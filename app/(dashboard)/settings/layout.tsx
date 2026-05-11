import UserLayout from "@/features/user/layouts/UserLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h3>Settings</h3>
      <UserLayout>{children}</UserLayout>
    </>
  );
}
