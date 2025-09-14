import React from "react";

//Styles
import styles from "./AccountDetails.module.scss";
import { UserProfile } from "../types/user";
import Image from "next/image";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";

interface AccountDetailsProps {
  user: UserProfile;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ user }) => {
  console.log(user);
  return (
    <div className={styles.accountDetails}>
      {/* <section className={`${styles.section}`}> */}
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
      {/* <div className={styles.avatarContainer}>
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
      </div> */}
      {/* </section>
      <section className={styles.section}> */}
      {/* <div className={styles.details}>
        <div className={styles.field}>
          <span>Username</span>
          <Input id="username" type="text" />
        </div>
        <div className={styles.field}>
          <span>Email</span>
          <span>{user.email}</span>
        </div>
        <div className={styles.field}>
          <span>Password</span>
          <span>***************</span>
        </div>
      </div> */}
      <section>
        <h4>Details</h4>
        <div className={styles.details}>
          <div className={styles.field}>
            <p className={styles.label}>Username</p>
            <Input layout="vertical" id="username" type="text" />
          </div>
          <div className={styles.field}>
            <p className={styles.label}>Email</p>
            <Input layout="vertical" id="email" type="email" />
          </div>
          <div className={styles.field}>
            <p className={styles.label}>Password</p>
            <Input layout="vertical" id="password" type="password" />
          </div>
          {/* <div className={styles.labels}>
          <p>Username</p>
          <p>Email</p>
          <p>Password</p>
        </div>
        <div className={styles.inputs}>
          <Input id="username" type="text" />
          <Input id="email" type="email" />
          <Input id="password" type="password" />
        </div> */}
        </div>
      </section>
      {/* </section> */}
    </div>
  );
};

export default AccountDetails;
