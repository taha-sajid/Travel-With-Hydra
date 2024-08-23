import React, { useEffect } from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import Header from "@/components/Header/header";
import styles from "./dashboard.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  // Check if user is logged in
  const isLoggedIn = authState.status === "succeeded" && authState.user !== null;

  useEffect(() => {
    // Redirect to login page if not logged in
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      {isLoggedIn && (
        <div className={styles.dashboard}>
          <Dashboard />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
