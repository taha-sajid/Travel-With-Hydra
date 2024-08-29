import BlogsCard from "@/components/BlogsCard/BlogsCard";
import Header from "@/components/Header/header";
import React from "react";
import styles from "./blogs.module.css";
import Footer from "@/components/Footer/Footer";

const blogsCardData = {
  heading: "Blogs",
  shortDescription:
    "We have extensive information on visas for every country on the planet.",
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
