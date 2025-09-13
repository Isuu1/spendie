import React, { useEffect } from "react";

//Styles
import styles from "./UserModal.module.scss";
//Icons
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import Image from "next/image";

interface UserModalProps {
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.userModal}`)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <ul className={styles.userModal}>
      <li>
        <Image
          className={styles.avatar}
          src="https://i.pravatar.cc/150?img=3"
          alt=""
          width={27}
          height={27}
          //   onClick={() => setIsModalOpen(!isModalOpen)}
        />
      </li>
      <li className={styles.details}>
        <span>Isuususu</span>
        <span className={styles.email}>test@email.com</span>
      </li>
      <li className={styles.item}>
        <FaUser />
        <span>Account details</span>
      </li>
      <li className={styles.item}>
        <IoSettings />
        <span>Settings</span>
      </li>
      <li className={styles.item}>
        <FaSignOutAlt />
        <span>Logout</span>
      </li>
    </ul>
  );
};

export default UserModal;
