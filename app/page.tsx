import { redirect } from "next/navigation";
//Components
import Header from "@/features/landing-page/components/Header";
import HeroSection from "@/features/landing-page/components/HeroSection";
import Features from "@/features/landing-page/components/Features";
import Footer from "@/features/landing-page/components/Footer";
import PaymentsFeature from "@/features/landing-page/components/PaymentsFeature";
import DashboardFeature from "@/features/landing-page/components/DashboardFeature";
import { createClient } from "@/supabase/server";
import AccountsFeature from "@/features/landing-page/components/AccountsFeature";

export default async function Home() {
  const supabase = await createClient();
  const data = await supabase.auth.getUser();

  if (data.data.user) {
    redirect("/dashboard");
  }

  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <Features />
      <PaymentsFeature />
      <DashboardFeature />
      <AccountsFeature />
      <Footer />
    </div>
  );
}
