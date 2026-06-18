import dashboard from "@/public/images/dashboard-feature3.png";
import Image from "next/image";
import Headline from "./Headline";

const DashboardFeature = () => {
  return (
    <div className="relative flex flex-col gap-16 pt-16 pb-16" id="dashboard">
      <Headline
        title="Choose Your Dashboard"
        subtitle="Customize your experience with our advanced dashboard features."
      />
      <div className="absolute top-0 left-1/2 right-[50%] w-screen ml-[-50vw] mr-[-50vw] h-full bg-[linear-gradient(135deg,#22252e_10%,#d34702_50%,#22252e_90%)] opacity-20 z-1"></div>
      <div className="grid grid-rows-2 lg:gap-12 lg:grid-cols-2 lg:grid-rows-1">
        <div className="flex flex-col gap-4 justify-center">
          <h2>Your dashboard, built your way</h2>
          <p className="leading-8 text-base">
            Spendie’s modular dashboard puts you in full control. Choose the
            panels you want to see, hide the ones you don’t, and create a
            workspace that matches your goals. Rearrange sections, unpin
            insights, and lock your sidebar for a focused view — your financial
            overview has never been this flexible.
          </p>
          <ul className="list-none flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <p className="text-base">
                Toggle panels on and off to create your ideal layout
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <p className="text-base">
                Rearrange or unpin modules for a fully personalized experience
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <p className="text-base">
                Lock the sidebar for a clean, distraction-free workspace
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <p className="text-base">
                Save your preferences and sync them effortlessly across devices
              </p>
            </li>
          </ul>
        </div>
        <div className="relative flex justify-center">
          <div className="z-5 absolute bottom-0 top-0 right-0 w-1/2 bg-[linear-gradient(90deg,#22222200,#222222)] rounded-2xl"></div>
          <Image
            src={dashboard}
            alt="Advanced Payments Illustration"
            className="rounded-2xl z-4 object-cover relative! max-h-100"
            fill
            unoptimized
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardFeature;
