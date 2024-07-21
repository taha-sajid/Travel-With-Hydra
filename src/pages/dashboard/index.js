import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import Header from "@/components/Header/header";
import styles from "./dashboard.module.css";

const dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.dashboard}>
        <Dashboard />
      </div>
    </div>
  );
};

export default dashboard;
