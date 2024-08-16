import { getHeroData } from "@/api/cms";
import { IMAGE_BASE_URL } from "@/api/config";
import React, { useEffect, useState } from "react";

const HeroSectionHome = () => {
  const [heroSectionData, setHeroSectionData] = useState({});
  const [heroBannerImages, setHeroBannerImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // API CALL
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await getHeroData();
        console.log("Hero data:", response.data);
        setHeroSectionData(response.data);

        const images = Object.keys(response.data)
          .filter(
            (key) =>
              key.startsWith("hero_banner_image") && response.data[key] !== null
          )
          .map((key) => response.data[key]);

        setHeroBannerImages(images);
      } catch (error) {
        console.error("Error fetching Hero data:", error);
      }
    };
    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (heroBannerImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % heroBannerImages.length
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [heroBannerImages]);

  return (
    <>
      <div className="hero-section-container">
        <div className="hero-section-heading animated-hero-left">
          <h1>{heroSectionData.hero_title}</h1>
          <p>{heroSectionData.hero_description}</p>
        </div>
        <div className="hero-section-image animated-hero-right">
          {heroBannerImages.length > 0 && (
            <img
              src={IMAGE_BASE_URL + heroBannerImages[currentImageIndex]}
              alt="Hero"
              className="hero-image"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HeroSectionHome;
