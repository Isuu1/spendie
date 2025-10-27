"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

//Styles
import styles from "./BackButton.module.scss";

interface BackButtonProps {
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ text }) => {
  const router = useRouter();

  return (
    <div className={styles.backButton} onClick={() => router.back()}>
      <i className={styles.icon}>
        <IoMdArrowRoundBack />
      </i>
      <p>{text}</p>
    </div>
  );
};

export default BackButton;
