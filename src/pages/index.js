import React from "react";
import Slider from "../components/Slider/slider";
import CustomerStories from "../components/CustomerStories/CutomerStories";
import TravelDestinationSelector from "@/components/TravelDestinationSelector/TravelDestinationSelector";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import Header from "../components/Header/header";
import BlogsCard from "@/components/BlogsCard/BlogsCard";
import Footer from "@/components/Footer/Footer";
import styles from "./homepage.module.css";
import { useSelector } from "react-redux";

const blogsCardData = {
  heading: "Blogs",
  shortDescription:
    "We have extensive information on visas for every country on the planet.",
};

const Page = () => {
  const token = useSelector((state) => state.auth.token);
  console.log("token", token);
  return (
    <div className="">
      <Header />
      <Slider />
      <TravelDestinationSelector />
      <WhyChooseUs />
      <CustomerStories />
      <div className={styles.BlogsCardContainer}>
        <BlogsCard cardData={blogsCardData} />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
