import React from "react";
import { useRouter } from "next/router";
import styles from "./HeroSectionOther.module.css";
const HeroSectionOther = () => {
  const router = useRouter();
  const isBlogDetailsPage = router.pathname.startsWith("/blogs/");
  const isDashboard = router.pathname === "/dashboard";
  const isPayment = router.pathname === "/payment";
  console.log(isDashboard);

  return (
    <>
      {!isBlogDetailsPage && !isDashboard && !isPayment && (
        <div className={styles.header_section}>
          <div className={styles.hero_section_container}>
            <img src="/assets/BlogHeroImage.png" />
            <div className={styles.overlay}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSectionOther;
