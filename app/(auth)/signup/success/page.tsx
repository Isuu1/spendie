import SignupSuccess from "@/features/auth/components/SignupSuccess";
//import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  // const params = useSearchParams();
  // const email = params.get("email");

  // if (!email) {
  //   // Redirect to home if email is not present in the URL
  //   window.location.href = "/";
  //   return null;
  // }

  return (
    <>
      <Suspense>
        <SignupSuccess />
      </Suspense>
    </>
  );
}
