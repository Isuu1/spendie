"use client";

import React from "react";
import styles from "./ErrorMessage.module.scss";
import Button from "./ui/Button";

interface ErrorMessageProps {
  message: string;
  variant: "dashboard" | "panel";
  onReload?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  variant,
  onReload,
}) => {
  const handleReload = () => {
    if (onReload) {
      onReload();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`${styles.errorContainer} ${styles[variant]}`}>
      <h3>{message || "An error occurred."}</h3>
      <p>Try to refresh the page or contact support if problem persists.</p>
      <Button
        text="Reload"
        variant="secondary"
        size="medium"
        onClick={handleReload}
      />
    </div>
  );
};

export default ErrorMessage;
