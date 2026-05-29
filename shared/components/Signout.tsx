import React from "react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
//Components
import Button from "./ui/Button";
import ConfirmAction from "./ConfirmAction";
//Icons
import { LogOut } from "lucide-react";
//Styles
import { toastStyle } from "../styles/toastStyle";
//Animations
import { AnimatePresence } from "motion/react";

type SignoutProps = {
  className?: string;
};

const Signout = ({ className }: SignoutProps) => {
  const [signoutClicked, setSignoutClicked] = React.useState(false);

  const supabase = createClient();

  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out. Please try again.", toastStyle);
    }
    router.push("/");
  };

  return (
    <>
      <Button
        icon={<LogOut />}
        iconPosition="left"
        onClick={() => setSignoutClicked(true)}
        className={className}
      >
        Logout
      </Button>
      <AnimatePresence>
        {signoutClicked && (
          <ConfirmAction
            title="Are you sure you want to sign out?"
            onCancel={() => setSignoutClicked(false)}
            onConfirm={handleSignOut}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Signout;
