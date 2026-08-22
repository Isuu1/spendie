import Footer from "@/features/landing-page/components/Footer";
import Header from "@/features/landing-page/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="xl:w-[90%] w-full m-auto px-4">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}
