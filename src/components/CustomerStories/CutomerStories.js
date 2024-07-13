import { useState, useEffect, useRef } from "react";
import styles from "./CustomerStories.module.css";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import VideoButton from "../VideoButton/VideoButton";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef(null);

  const images = [
    "/assets/customerSlider1.png",
    "/assets/customerSlider2.png",
    "/assets/customerSlider3.png",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sliderRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const getSlideClass = (index) => {
    const relativeIndex =
      (index - currentIndex + images.length) % images.length;
    switch (relativeIndex) {
      case 0:
        return styles.prevSlide;
      case 1:
        return styles.centerSlide;
      case 2:
        return styles.nextSlide;
      default:
        return styles.hiddenSlide;
    }
  };

  return (
    <div
      className={`${styles.customer_stories_container} ${
        isVisible ? styles.animate : ""
      }`}
      ref={sliderRef}
    >
      <h1>Customer Stories</h1>
      <p> 
        Lorem ipsum dolor sit amet consectetur. Orci lectus aliquam nunc
        fringilla blandit id. At ut blandit in fermentum consectetur nisl
        sagittis quis morbi.
      </p>
      <div className={styles.sliderContainer}>
        <div className={styles.slides}>
          {images.map((src, index) => (
            <div
              key={index}
              className={`${styles.slide} ${getSlideClass(index)}`}
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className={styles.slideImage}
              />
            </div>
          ))}
          <VideoButton className={styles.video_play_button} />
        </div>
        <div className={styles.navigationButtons}>
          <button onClick={prevSlide}>
            <img src="/assets/leftArrow.png" />
          </button>
          <button onClick={nextSlide}>
            <img src="/assets/rightArrow.png" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
