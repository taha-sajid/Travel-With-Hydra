import React from "react";
import Header from "@/components/Header/header";
import ContactUs from "@/components/ContactUS/ContactForm";
import styles from "./contactus.module.css";
import Footer from "@/components/Footer/Footer";
const index = () => {
  return (
    <div className={styles.contactUsContainer}>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.bodyContainer}>
        <ContactUs />
        <Footer />
      </div>
    </div>
  );
};

export default index;
