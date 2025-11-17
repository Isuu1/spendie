import AuthNav from "@/features/auth/components/AuthNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-layout">
      <div className="inner-wrapper">
        <AuthNav />
        {children}
      </div>
      <div className="image"></div>
    </div>
  );
}
