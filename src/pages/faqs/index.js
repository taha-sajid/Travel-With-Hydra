import React, { useEffect, useState } from "react";
import Header from "@/components/Header/header";
import styles from "./faqs.module.css";
import Accordion from "@/components/Accordion/Accordion";
import Footer from "@/components/Footer/Footer";
import { getFAQsData } from "@/api/cms";

const Index = () => {
  const [faqs, setFaqs] = useState([]);
  const [bannerImage, setBannerImage] = useState("");

  const fetchFAQs = async () => {
    try {
      const response = await getFAQsData();
      console.log("FAQs data:", response.data);
      setFaqs(response.data);

      // Extract banner_image from the first item in the response array
      if (response.data.length > 0) {
        setBannerImage(response.data[0].banner_image);
      }
    } catch (error) {
      console.error("Error fetching FAQs data:", error);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, [bannerImage]);

  console.log("bannerImage", bannerImage);
  return (
    <div>
      {/* Pass the extracted bannerImage to the Header component */}
      <Header bannerImage={bannerImage} />
      <div className={styles.faqsContainer}>
        <h1>FAQs</h1>
        <Accordion faqs={faqs[0]?.faqs || []} />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
