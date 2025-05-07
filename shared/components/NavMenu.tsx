import React, { useState } from "react";

//Styles
import styles from "./NavMenu.module.scss";

const NavMenu = () => {
  const [activeTab, setActiveTab] = useState("summary");
  return (
    <ul className={styles.menu}>
      <li
        className={`${styles.item} ${activeTab === "summary" ? styles.active : ""}`}
        onClick={() => setActiveTab("summary")}
      >
        Summary
      </li>
      <li
        className={`${styles.item} ${activeTab === "income" ? styles.active : ""}`}
        onClick={() => setActiveTab("income")}
      >
        Income
      </li>
      <li
        className={`${styles.item} ${activeTab === "expense" ? styles.active : ""}`}
        onClick={() => setActiveTab("expense")}
      >
        Expense
      </li>
    </ul>
  );
};

export default NavMenu;
