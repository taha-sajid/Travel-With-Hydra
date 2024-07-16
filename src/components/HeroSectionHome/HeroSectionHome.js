import React, { useEffect, useState } from "react";

const images = [
  "/assets/illus1.png",
  "/assets/illus2.png",
  "/assets/illus3.png",
  "/assets/illus4.png",
];

const HeroSectionHome = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="hero-section-container">
        <div className="hero-section-heading animated-hero-left">
          <h1>Discover the world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Id mi erat faucibus ac est
            metus tristique. Semper sapien metus elit diam in id. Pretium congue
            ridiculus bibendum magna pellentesque
          </p>
        </div>
        <div className="hero-section-image animated-hero-right">
          <img
            src={images[currentImageIndex]}
            alt="Hero"
            className="hero-image"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSectionHome;
