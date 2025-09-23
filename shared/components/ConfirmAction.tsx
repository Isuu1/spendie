"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
//Components
import Button from "./ui/Button";
//Styles
import styles from "./ConfirmAction.module.scss";
//Animations
import { motion } from "motion/react";

interface ConfirmActionProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const confirmActionVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.15 } },
  exit: { scale: 0, transition: { duration: 0.15 } },
};

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
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
      <motion.div
        className={styles.innerContainer}
        variants={confirmActionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h3>{message}</h3>
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
    </div>
  );
  //Render nothing during SSR or before mount/target is ready
  if (!isMounted || !modalRootRef.current) {
    return null;
  }

  //Render into the portal target node
  return createPortal(modalContent, modalRootRef.current);
};

export default ConfirmAction;
