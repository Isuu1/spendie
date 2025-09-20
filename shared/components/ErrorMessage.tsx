"use client";

import React from "react";
import styles from "./ErrorMessage.module.scss";
import Button from "./ui/Button";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <h3>{message || "An error occurred."}</h3>
      <p>Try to refresh the page or contact support if problem persists.</p>
      <Button
        text="Reload"
        variant="secondary"
        size="medium"
        onClick={() => window.location.reload()}
      />
    </div>
  );
};

export default ErrorMessage;
