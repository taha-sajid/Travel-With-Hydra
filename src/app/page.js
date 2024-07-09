import React from "react";
import Slider from "../components/Slider/slider";
import TravelDestinationSelector from "@/components/TravelDestinationSelector/TravelDestinationSelector";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import Header from "../components/Header/header";

const Page = () => {
  return (
    <div className="">
      <Header />
      <Slider />
      <TravelDestinationSelector />
      <WhyChooseUs />
    </div>
  );
};

export default Page;
