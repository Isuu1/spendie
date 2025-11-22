import Header from "@/features/landing-page/components/Header";
import HeroSection from "@/features/landing-page/components/HeroSection";
//import { createClient } from "@/supabase/server";
//import Image from "next/image";
//import { redirect } from "next/navigation";
//import bg from "@/public/images/step_background.svg";
import Features from "@/features/landing-page/components/Features";
import Footer from "@/features/landing-page/components/Footer";
import PaymentsFeature from "@/features/landing-page/components/PaymentsFeature";
import DashboardFeature from "@/features/landing-page/components/DashboardFeature";

export default async function Home() {
  // const supabase = await createClient();

  // const { data: user } = await supabase.auth.getUser();

  // console.log("User on home page:", user);

  // if (user) {
  //   redirect("/dashboard");
  // }
  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <Features />
      <PaymentsFeature />
      <DashboardFeature />
      <Footer />
      {/* <Image src={bg} alt="Background Image" fill className="bg" /> */}
    </div>
  );
}
