"use client";

import React from "react";
import Image from "next/image";
//Images
import dashboard from "@/public/images/dashboard1.png";
import mobileDashboard from "@/public/images/dashboard-mobile.png";
//Components
import Button from "@/shared/components/ui/Button";
import { useWindowWidth } from "../hooks/useWindowWidth";

const HeroSection = () => {
  const windowWidth = useWindowWidth();

  return (
    <section className="mt-37.5 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center text-center gap-4 max-w-225">
        <h1>Take control of your money — effortlessly.</h1>
        <p className="leading-8 text-base">
          Spendie brings your accounts, bills, and recurring payments together
          into one clear dashboard — so you can plan smarter and stress less.
        </p>
        <div className="flex gap-4 mt-4">
          <Button variant="secondary">Get Started</Button>
          <Button variant="default">Try demo</Button>
        </div>
      </div>
      {windowWidth && windowWidth < 768 ? (
        <div className="relative w-full h-200 ">
          <Image
            src={mobileDashboard}
            alt="Hero Image"
            className="relative rounded-2xl object-contain"
            fill
            loading="eager"
            quality={90}
            sizes="(max-width: 1200px) 100vh, 1440px"
          />
        </div>
      ) : (
        <div className="relative aspect-video w-full max-w-262.5 rounded-2xl shadow-default">
          <Image
            src={dashboard}
            alt="Hero Image"
            className="relative rounded-2xl object-cover"
            fill
            loading="eager"
            quality={90}
            sizes="(max-width: 1200px) 100vw, 1440px"
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
