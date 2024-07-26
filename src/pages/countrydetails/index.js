import CountryDetails from "@/components/CountryDetails/CountryDetails";
import React from "react";
import Header from "@/components/Header/header";
import styles from "./countrydetails.module.css";
import Footer from "@/components/Footer/Footer";
import BlogsCard from "@/components/BlogsCard/BlogsCard";

const blogsCardData = {
  heading: "Related Blogs",
  shortDescription: "Explore our latest blogs from our active users",
};
const index = () => {
  return (
    <div>
      <Header />
      <div className={styles.countryDetailsContainer}>
        <CountryDetails />
      </div>
      <div className={styles.blogsCardContainer}>
        <BlogsCard cardData={blogsCardData} />
      </div>
      <Footer />
    </div>
  );
};

export default index;
