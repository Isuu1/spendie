"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
//Components
import Button from "./ui/Button";
//Styles
import styles from "./ConfirmAction.module.scss";

interface ConfirmActionProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

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
      <div className={styles.innerContainer}>
        <p>{message}</p>
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
      </div>
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
