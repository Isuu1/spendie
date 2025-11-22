"use client";

import SignupSuccess from "@/features/auth/components/SignupSuccess";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const email = params.get("email");

  if (!email) {
    // Redirect to home if email is not present in the URL
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <SignupSuccess email={email} />
    </>
  );
}
