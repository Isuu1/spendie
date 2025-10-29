import Header from "@/features/landing-page/components/Header";
import { createClient } from "@/supabase/server";
//import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  console.log("User on home page:", user);

  // if (user) {
  //   redirect("/dashboard");
  // }
  return (
    <div>
      <Header />
    </div>
  );
}
