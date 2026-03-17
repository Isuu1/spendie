"use client";

import BackButton from "@/shared/components/BackButton";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = pathname.includes("add-payment")
    ? "Add payment"
    : pathname.includes("edit-payment")
      ? "Edit payment"
      : "Recurring Payments";

  return (
    <div className="page">
      <BackButton text={pageTitle} />
      {children}
    </div>
  );
}
