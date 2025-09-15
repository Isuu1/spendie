import React from "react";
import Image from "next/image";

//Styles
import styles from "./AccountDetails.module.scss";
//Types
import { UserProfile } from "../types/user";
//Components
import Button from "@/shared/components/ui/Button";
import ChangeDetailsForm from "./ChangeDetailsForm";

interface AccountDetailsProps {
  user: UserProfile;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ user }) => {
  return (
    <div className={styles.accountDetails}>
      <section>
        <h4>Profile picture</h4>
        <div className={styles.avatarContainer}>
          <Image
            className={styles.avatar}
            src="https://i.pravatar.cc/150?img=3"
            alt=""
            width={100}
            height={100}
          />
          <div className={styles.editButton}>
            <Button text="Change" variant="primary" size="small" />
          </div>
          <div className={styles.separator}></div>
        </div>
      </section>
      <section>
        <h4>Details</h4>
        <ChangeDetailsForm user={user} />
        {/* <div className={styles.details}>
          <Input
            layout="vertical"
            id="username"
            type="text"
            label="Username"
            defaultValue={user.username}
          />
          <Input
            layout="vertical"
            id="email"
            type="email"
            label="Email"
            defaultValue={user.email}
          />
          <Input
            layout="vertical"
            id="password"
            type="password"
            label="Password"
          />
        </div> */}
      </section>
    </div>
  );
};

export default AccountDetails;
