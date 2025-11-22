"use client";

import SignupSuccess from "@/features/auth/components/SignupSuccess";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Page() {
  const params = useSearchParams();
  const email = params.get("email");

  return (
    <>
      <SignupSuccess email={email} />
    </>
  );
}
