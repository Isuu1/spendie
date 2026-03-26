"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
//Components
import Button from "./ui/Button";
//Styles
import styles from "./ConfirmAction.module.scss";
//Animations
import { motion } from "motion/react";
import { useClickOutside } from "../hooks/useClickOutside";

interface ConfirmActionProps {
  title: string;
  subtitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  title,
  subtitle,
  onConfirm,
  onCancel,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRootRef = useRef<HTMLElement | null>(null);
  const innerModalRef = useRef<HTMLDivElement>(null);

  useClickOutside(innerModalRef, onCancel);

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
    <motion.div
      className={styles.confirmActionContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        ref={innerModalRef}
        className={styles.innerContainer}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.15 }}
        role="dialog"
        aria-modal="true"
      >
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.buttonsContainer}>
          <Button
            variant="primary"
            onClick={onConfirm}
            text="Confirm"
            size="medium"
            type="button"
          />
          <Button
            variant="secondary"
            onClick={onCancel}
            text="Cancel"
            size="medium"
            type="button"
          />
        </div>
      </motion.div>
    </motion.div>
  );
  //Render nothing during SSR or before mount/target is ready
  if (!isMounted || !modalRootRef.current) {
    return null;
  }

  //Render into the portal target node
  return createPortal(modalContent, modalRootRef.current);
};

export default ConfirmAction;
