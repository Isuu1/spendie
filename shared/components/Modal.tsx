"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
    let portalNode = document.getElementById("modal-root");
    if (!portalNode) {
      portalNode = document.createElement("div");
      portalNode.id = "modal-root";
      document.body.appendChild(portalNode);
    }
    modalRootRef.current = portalNode;
  }, []);

  const modalContent = (
    <div
      className="z-99 fixed top-0 h-full left-0 w-full bg-[#2e2e2ea2] flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      <motion.div
        className="bg-background rounded-2xl flex flex-col items-center gap-4 p-6 leading-6"
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
