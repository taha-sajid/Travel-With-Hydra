import React from "react";
import Slider from "../components/Slider/slider";
import CustomerStories from "../components/CustomerStories/CutomerStories";
import TravelDestinationSelector from "@/components/TravelDestinationSelector/TravelDestinationSelector";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import Header from "../components/Header/header";
import BlogsCard from "@/components/BlogsCard/BlogsCard";
import Footer from "@/components/Footer/Footer";

const Page = () => {
  return (
    <div className="">
      <Header />
      <Slider />
      <TravelDestinationSelector />
      <WhyChooseUs />
      <CustomerStories />
      <BlogsCard />
      <Footer />
    </div>
  );
};

export default Page;
