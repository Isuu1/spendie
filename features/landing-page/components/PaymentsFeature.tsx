import React from "react";
import payments from "@/public/images/payments2.png";
import Image from "next/image";
import Headline from "./Headline";

const PaymentsFeature = () => {
  return (
    <div className="relative flex flex-col gap-16 pt-16 pb-16" id="payments">
      <div className="absolute top-0 left-1/2 right-[50%] w-screen ml-[-50vw] mr-[-50vw] h-full bg-card z-1"></div>
      <Headline
        title="Never miss a bill again."
        subtitle="Keep your subscriptions and payments on track — automatically."
      />
      <div className="grid grid-rows-2 lg:gap-6 lg:grid-cols-[1.5fr_1fr] lg:grid-rows-1">
        <div className="relative flex justify-center">
          <Image
            src={payments}
            alt="Advanced Payments Illustration"
            className="rounded-2xl z-4 object-cover relative! max-h-240"
            fill
            unoptimized
            priority
          />
        </div>
        <div className="relative z-2 flex flex-col gap-4 justify-center">
          <h2>Track your regular payments</h2>
          <p className="leading-8 text-base">
            Stay on top of your finances with our advanced payments management
            features. Easily track recurring payments, mark bills as paid, and
            get timely reminders for upcoming due dates. Our intuitive interface
            ensures you never miss a payment, helping you maintain a healthy
            financial life.
          </p>
          <ul className="list-none flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full shrink-0"></span>
              <p className="text-base">
                Automatically track your regular payments
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full shrink-0"></span>
              <p className="text-base">Get reminders for upcoming due dates</p>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full shrink-0"></span>
              <p className="text-base">
                Visualize your payment history and trends
              </p>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-3 h-3 bg-primary rounded-full shrink-0"></span>
              <p className="text-base">
                Visual timeline view — see upcoming and overdue payments in
                seconds.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentsFeature;
