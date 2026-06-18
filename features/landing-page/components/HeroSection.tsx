import React from "react";
import Image from "next/image";
//Images
import dashboard from "@/public/images/dashboard2.png";
//Components
import Button from "@/shared/components/ui/Button";

const HeroSection = () => {
  return (
    <section className="mt-37.5 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center text-center gap-4 max-w-225">
        <h1>Take control of your money — effortlessly.</h1>
        <p className="leading-8">
          Spendie brings your accounts, bills, and recurring payments together
          into one clear dashboard — so you can plan smarter and stress less.
        </p>
        <div className="flex gap-4 mt-4">
          <Button variant="secondary">Get Started</Button>
          <Button variant="default">Try demo</Button>
        </div>
      </div>
      <Image
        src={dashboard}
        alt="Hero Image"
        className="relative max-w-262.5 aspect-3/2 rounded-2xl"
      />
    </section>
  );
};

export default HeroSection;
