import React from "react";
//Styles
import styles from "./Headline.module.scss";

interface HeadlineProps {
  title: string;
  subtitle: string;
}

const Headline = ({ title, subtitle }: HeadlineProps) => {
  return (
    <div className={styles.headline}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default Headline;
