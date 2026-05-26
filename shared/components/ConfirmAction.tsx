"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
//Components
import Button from "./ui/Button";
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

  // Handle Keyboard (Esc and Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent scrolling of body when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onCancel, onConfirm]);

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
      className="bg-[#2e2e2e83] z-99 fixed top-0 left-0 w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        ref={innerModalRef}
        className="bg-card text-white rounded-2xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4 items-center text-center leading-8"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.15 }}
        role="dialog"
        aria-modal="true"
      >
        <h4>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
        <div className="flex gap-4 mt-1">
          <Button
            variant="destructive"
            onClick={onConfirm}
            size="sm"
            type="button"
          >
            Confirm
          </Button>
          <Button
            variant="secondary"
            onClick={onCancel}
            size="sm"
            type="button"
          >
            Cancel
          </Button>
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
