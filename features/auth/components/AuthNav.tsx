"use client";

import React from "react";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

const AuthNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="relative flex gap-4 bg-background rounded-md list-none px-2 py-1">
      <motion.span
        className="z-1 absolute top-0 left-0 bottom-0 w-1/2 h-full bg-accent rounded-md"
        animate={{ x: pathname.includes("/login") ? "0%" : "100%" }}
        initial={false} // Prevent animation on initial render
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      ></motion.span>
      <div
        className="z-2 relative cursor-pointer rounded-md px-2 py-1"
        onClick={() => router.push("/login")}
      >
        Sign In
      </div>
      <div
        className="z-2 relative cursor-pointer rounded-md px-2 py-1"
        onClick={() => router.push("/signup")}
      >
        Sign Up
      </div>
    </nav>
  );
};

export default AuthNav;
