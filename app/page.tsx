import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}
