"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
//Styles
import styles from "./Modal.module.scss";

interface Modal {
  children: React.ReactNode;
}

const Modal: React.FC<Modal> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRootRef = useRef<HTMLElement | null>(null);

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

  const modalContent = (
    <div className={styles.confirmActionContainer}>
      <div className={styles.innerContainer}>{children}</div>
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
