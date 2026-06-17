import SettingsLayout from "@/features/settings/layouts/SettingsLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-2xl p-6 flex flex-col gap-2">
      <h3>Settings</h3>
      <p>Manage your account settings and preferences.</p>
      <SettingsLayout>{children}</SettingsLayout>
    </div>
  );
}
