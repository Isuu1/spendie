import AuthNav from "@/features/auth/components/AuthNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-layout">
      <AuthNav />
      {children}
    </div>
  );
}
