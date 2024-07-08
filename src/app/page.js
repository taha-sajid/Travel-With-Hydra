import React from "react";
import Slider from "../components/Slider/slider";
import TravelDestinationSelector from "@/components/TravelDestinationSelector/TravelDestinationSelector";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
const Header = () => {
  return (
    <div className="">
      <Slider />
      <TravelDestinationSelector />
      <WhyChooseUs />
    </div>
  );
};

export default Header;
