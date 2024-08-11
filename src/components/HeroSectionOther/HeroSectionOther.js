import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./HeroSectionOther.module.css";
import { API_BASE_URL } from "@/api/config";

const HeroSectionOther = ({ bannerImage }) => {
  const router = useRouter();
  const isBlogDetailsPage = router.pathname.startsWith("/blogs/");
  const isDashboard = router.pathname === "/dashboard";
  const isPayment = router.pathname === "/payment";
  const isLogin = router.pathname === "/login";
  const isSignUp = router.pathname === "/signup";
  const isForgotPassword = router.pathname === "/forgotpassword";
  const isResetPassword = router.pathname === "/newpassword";

  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
    setHeroImage(API_BASE_URL + bannerImage);
  }, [bannerImage]);

  console.log("bannerImage", bannerImage);
  return (
    <>
      {!isBlogDetailsPage &&
        !isDashboard &&
        !isPayment &&
        !isLogin &&
        !isSignUp &&
        !isForgotPassword &&
        !isResetPassword && (
          <div className={styles.header_section}>
            <div className={styles.hero_section_container}>
              {/* <img src="/assets/BlogHeroImage.png" alt="Banner Image" /> */}
              <img src={heroImage} alt="Banner Image" />
              <div className={styles.overlay}></div>
            </div>
          </div>
        )}
    </>
  );
};

export default HeroSectionOther;
