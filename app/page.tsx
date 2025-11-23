import { redirect } from "next/navigation";
//Components
import Header from "@/features/landing-page/components/Header";
import HeroSection from "@/features/landing-page/components/HeroSection";
import Features from "@/features/landing-page/components/Features";
import Footer from "@/features/landing-page/components/Footer";
import PaymentsFeature from "@/features/landing-page/components/PaymentsFeature";
import DashboardFeature from "@/features/landing-page/components/DashboardFeature";
//Api
import { getUserServer } from "@/features/user/api/getUserServer";

export default async function Home() {
  const { user, error } = await getUserServer();

  if (user && !error) {
    redirect("/dashboard");
  }
  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <Features />
      <PaymentsFeature />
      <DashboardFeature />
      <Footer />
    </div>
  );
}
