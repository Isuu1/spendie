import SignupSuccess from "@/features/auth/components/SignupSuccess";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense>
        <SignupSuccess />
      </Suspense>
    </>
  );
}
