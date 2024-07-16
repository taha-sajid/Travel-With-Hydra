import React from "react";
import { useRouter } from "next/router";
import styles from "./HeroSectionOther.module.css";
const HeroSectionOther = () => {
  const router = useRouter();
  const isBlogDetailsPage = router.pathname === "/blogdetails";
  return (
    <>
      {!isBlogDetailsPage && (
        <div className={styles.hero_section_container}>
          <img src="/assets/BlogHeroImage.png" />
          <div className={styles.overlay}></div>
        </div>
      )}
    </>
  );
};

export default HeroSectionOther;
