import React from "react";
import Headline from "./Headline";
import Image from "next/image";
import accounts from "@/public/images/accounts-feature3.png";

const AccountsFeature = () => {
  return (
    <div className="relative flex flex-col gap-16 pt-16 pb-16" id="accounts">
      <Headline
        title="Manage Your Accounts with Ease"
        subtitle="Take control of your finances with our intuitive account management features."
      />
      {/* <div className="absolute top-0 left-1/2 right-[50%] w-screen ml-[-50vw] mr-[-50vw] h-full bg-[linear-gradient(135deg,#22252e_10%,#d34702_50%,#22252e_90%)] opacity-20 z-1"></div> */}
      <div className="grid grid-rows-2 lg:gap-12 lg:grid-cols-[1fr_1.5fr] lg:grid-rows-1">
        <div className="flex flex-col gap-4 justify-center">
          <h2>Manage all your accounts in one place</h2>
          <p className="leading-8 text-base">
            Get a complete overview of your financial life by connecting and
            managing all your accounts in a single dashboard. Monitor balances,
            track account activity, and gain real-time insights into your
            finances without switching between multiple banking apps. Stay
            organized and make smarter financial decisions with a clear picture
            of where your money is.
          </p>
          <ul className="list-none flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <p className="text-base">
                Connect multiple bank accounts and financial institutions
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <p className="text-base">
                View account balances and recent activity in one place
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <p className="text-base">
                Track account performance and cash flow trends
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <p className="text-base">
                Real-time account synchronization for up-to-date financial data
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <p className="text-base">
                Securely manage all your financial accounts from a single
                dashboard
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <p className="text-base">
                Unified financial overview — see your complete financial picture
                at a glance.
              </p>
            </li>
          </ul>
        </div>
        <div className="relative rounded-2xl overflow-hidden">
          {/* <div className="z-5 absolute bottom-0 top-0 right-0 w-1/2 bg-[linear-gradient(90deg,#22222200,#222222)] rounded-2xl"></div> */}
          <Image
            src={accounts}
            alt="Accounts Accounts Illustration"
            className="rounded-2xl z-4 object-contain relative! max-w-210"
            fill
            unoptimized
            priority
            sizes="(max-width: 1200px) 100vw, 1440px"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountsFeature;
