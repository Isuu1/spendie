import SettingsLayout from "@/features/settings/layouts/SettingsLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h3>Settings</h3>
      <p>Manage your account settings and preferences.</p>
      <SettingsLayout>{children}</SettingsLayout>
    </>
  );
}
