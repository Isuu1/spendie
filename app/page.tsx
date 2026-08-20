import { redirect } from "next/navigation";
//Components
import HeroSection from "@/features/landing-page/components/HeroSection";
import Features from "@/features/landing-page/components/Features";
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
    <div className="xl:w-[90%] w-full m-auto px-4">
      <HeroSection />
      <Features />
      <PaymentsFeature />
      <DashboardFeature />
      <AccountsFeature />
    </div>
  );
}
