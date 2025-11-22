"use client";

import SignupSuccess from "@/features/auth/components/SignupSuccess";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  const params = useSearchParams();
  const email = params.get("email");

  return (
    <>
      <Suspense>
        <SignupSuccess email={email} />
      </Suspense>
    </>
  );
}
