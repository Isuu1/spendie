import Image from "next/image";
import React from "react";
//Styles
import styles from "./AccountDetails.module.scss";
import Button from "@/shared/components/ui/Button";

const ChangeAvatarForm = () => {
  return (
    <div className={styles.avatarContainer}>
      <Image
        className={styles.avatar}
        src="https://i.pravatar.cc/150?img=3"
        alt=""
        width={100}
        height={100}
      />
      <div className={styles.editButton}>
        <Button text="Change" variant="primary" size="medium" />
      </div>
      <div className={styles.separator}></div>
    </div>
  );
};

export default ChangeAvatarForm;
