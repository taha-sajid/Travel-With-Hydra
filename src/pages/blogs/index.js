import BlogsCard from "@/components/BlogsCard/BlogsCard";
import Header from "@/components/Header/header";
import React from "react";
import styles from "./blogs.module.css";
import Footer from "@/components/Footer/Footer";

const blogsCardData = {
  heading: "Blogs",
  shortDescription:
    "Embark on unforgettable journeys with our travel blogs! Dive into expert tips, hidden gems, and inspiring stories that will fuel your wanderlust and guide your next adventure.",
};
const index = () => {
  return (
    <div>
      <Header />
      <div className={styles.blogsCardContainer}>
        <BlogsCard cardData={blogsCardData} />
      </div>
      <Footer />
    </div>
  );
};

export default index;
