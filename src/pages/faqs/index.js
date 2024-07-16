import Header from "@/components/Header/header";
import React, { useEffect } from "react";
import styles from "./faqs.module.css";
import Accordion from "@/components/Accordion/Accordion";
import Footer from "@/components/Footer/Footer";

const Index = () => {
  return (
    <div>
      <Header />
      <div className={styles.faqsContainer}>
        <h1>FAQs</h1>
        <Accordion />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
