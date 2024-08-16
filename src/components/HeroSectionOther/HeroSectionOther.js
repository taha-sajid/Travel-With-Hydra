import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./HeroSectionOther.module.css";
import { IMAGE_BASE_URL } from "@/api/config";

const HeroSectionOther = ({ bannerImage }) => {
  const router = useRouter();
  const isBlogDetailsPage = router.pathname.startsWith("/blogs/");
  const isDashboard = router.pathname === "/dashboard";
  const isPayment = router.pathname === "/payment";
  const isLogin = router.pathname === "/login";
  const isSignUp = router.pathname === "/signup";
  const isForgotPassword = router.pathname === "/forgotpassword";
  const isResetPassword = router.pathname === "/newpassword";
  const isCountryDetailsPage = router.pathname === "/country/[countryName]";

  const isContactUs = router.pathname === "/contactus";
  const isBlogPage = router.pathname === "/blogs";
  const isFAQsPage = router.pathname === "/faqs";

  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
    if (isFAQsPage || isCountryDetailsPage) {
      setHeroImage(IMAGE_BASE_URL + bannerImage);
    } else if (isContactUs) {
      setHeroImage("/assets/contact-us.png");
    } else if (isBlogPage) {
      setHeroImage("/assets/blogHeroImage.png");
    }
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
              <div
                className={
                  isContactUs ? styles.overlayWhite : styles.overlayBlack
                }
              ></div>
            </div>
          </div>
        )}
    </>
  );
};

export default HeroSectionOther;
