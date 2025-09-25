"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
//Styles
import styles from "./Modal.module.scss";
//Animations
import { motion } from "motion/react";

interface Modal {
  children: React.ReactNode;
  onClose?: () => void;
}

const modalVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.15 } },
  exit: { scale: 0, transition: { duration: 0.15 } },
};

const Modal: React.FC<Modal> = ({ children, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRootRef = useRef<HTMLElement | null>(null);
  const modalInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    let portalNode = document.getElementById("confirm-action-root");
    if (!portalNode) {
      portalNode = document.createElement("div");
      portalNode.id = "confirm-action-root";
      document.body.appendChild(portalNode);
    }
    modalRootRef.current = portalNode;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalInnerRef.current &&
        !modalInnerRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const modalContent = (
    <div className={styles.confirmActionContainer}>
      <motion.div
        className={styles.innerContainer}
        ref={modalInnerRef}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </div>
  );
  //Render nothing during SSR or before mount/target is ready
  if (!isMounted || !modalRootRef.current) {
    return null;
  }

  //Render into the portal target node
  return createPortal(modalContent, modalRootRef.current);
};

export default Modal;
