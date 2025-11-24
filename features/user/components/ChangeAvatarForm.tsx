import Image from "next/image";
import React from "react";
//Styles
import styles from "./AccountDetails.module.scss";
import Button from "@/shared/components/ui/Button";
import { UserProfile } from "../types/user";

interface ChangeAvatarFormProps {
  user: UserProfile;
}

const ChangeAvatarForm = ({ user }: ChangeAvatarFormProps) => {
  const avatarUrl = user?.avatar;

  return (
    <div className={styles.avatarContainer}>
      <Image
        className={styles.avatar}
        src={avatarUrl || "https://i.pravatar.cc/150?img=3"}
        alt=""
        width={100}
        height={100}
      />
      <div className={styles.editButton}>
        <Button text="Change" variant="primary" size="medium" />
      </div>
    </div>
  );
};

export default ChangeAvatarForm;
