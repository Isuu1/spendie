import SignupSuccess from "@/features/auth/components/SignupSuccess";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  if (!email) {
    redirect("/signup");
  }

  return <SignupSuccess />;
}
