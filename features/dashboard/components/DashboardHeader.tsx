"use client";

//import { user } from "@/data/user";
import Image from "next/image";
import React, { useEffect } from "react";

//Icons
import { IoNotifications } from "react-icons/io5";
//Styles
import styles from "./DashboardHeader.module.scss";
import { createClient } from "@/supabase/client";
import { UserProfile } from "@/features/user/types/user";

const DashboardHeader = () => {
  const [user, setUser] = React.useState<UserProfile | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        console.log("User data:", data);
      }
      const user = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user?.id)
        .single();
      console.log("Profile data:", user);
      setUser(user.data);
    };

    fetchUser();
  }, [supabase]);

  return (
    <div className={styles.header}>
      <p className={styles.welcomeMessage}>Welcome, {user?.username}</p>
      <Image
        className={styles.avatar}
        src="https://i.pravatar.cc/150?img=3"
        alt=""
        width={27}
        height={27}
      />
      <i className={styles.notificationsIcon}>
        <IoNotifications />
        <span className={styles.counter}></span>
      </i>
    </div>
  );
};

export default DashboardHeader;
