"use client";

//Icons
import { FaPiggyBank } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
//Components
import Button from "@/shared/components/ui/Button";
import Headline from "./Headline";
//Utils
import { scrollToSection } from "../lib/utils/scrollToSection";

const Features = () => {
  return (
    <section className="flex flex-col gap-10 justify-center mt-14 mb-14">
      <Headline
        title="All your money, organized."
        subtitle="Track, plan, and forecast effortlessly."
      />
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="flex flex-col items-center gap-4 text-center bg-card rounded-2xl p-8 max-w-82.5 leading-6">
          <span className="bg-accent p-2 rounded-lg text-lg">
            <FaPiggyBank />
          </span>
          <h2>Track all accounts</h2>
          <p>
            Connect bank accounts with Plaid and see your total balance in one
            view.
          </p>
          <Button
            variant="default"
            onClick={() => scrollToSection("accounts")}
            className="mt-auto"
          >
            Read more
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4 text-center bg-card rounded-2xl p-8 max-w-82.5 leading-6">
          <span className="bg-accent p-2 rounded-lg text-lg">
            <FaRepeat />
          </span>
          <h2>Recurring payments simplified</h2>
          <p>
            Never miss a bill again. Mark payments as paid and see what’s due
            next.
          </p>
          <Button
            variant="default"
            onClick={() => scrollToSection("payments")}
            className="mt-auto"
          >
            Read more
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4 text-center bg-card rounded-2xl p-8 max-w-82.5 leading-6">
          <span className="bg-accent p-2 rounded-lg text-lg">
            <MdSpaceDashboard />
          </span>
          <h2>Customizable dashboard</h2>
          <p>Choose your dashboard tiles and make Spendie fit your goals.</p>
          <Button
            variant="default"
            onClick={() => scrollToSection("dashboard")}
            className="mt-auto"
          >
            Read more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
