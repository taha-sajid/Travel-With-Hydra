import { useState, useEffect, useRef } from "react";
import styles from "./CustomerStories.module.css";
import { getCustomerStoriesData } from "@/api/cms";
import { IMAGE_BASE_URL } from "@/api/config";

const CustomerStories = () => {
  const [CustomerStories, setCustomerStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the video is playing
  const sliderRef = useRef(null);
  const videoRefs = useRef([]); // Array of refs for each video element

  const fetchCustomerStoriesData = async () => {
    try {
      const response = await getCustomerStoriesData();
      console.log("customer stories data:", response.data);
      setCustomerStories(response.data);
    } catch (error) {
      console.error("Error fetching customer stories data:", error);
    }
  };

  useEffect(() => {
    fetchCustomerStoriesData();
  }, []);

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

  useEffect(() => {
    const currentVideoRef = videoRefs.current[currentIndex];
    if (currentVideoRef) {
      currentVideoRef.addEventListener("play", handleVideoPlay);
      currentVideoRef.addEventListener("pause", handleVideoPause);
      currentVideoRef.addEventListener("ended", handleVideoPause); // Handle video end

      return () => {
        if (currentVideoRef) {
          currentVideoRef.removeEventListener("play", handleVideoPlay);
          currentVideoRef.removeEventListener("pause", handleVideoPause);
          currentVideoRef.removeEventListener("ended", handleVideoPause);
        }
      };
    }
  }, [currentIndex, isPlaying]);

  const prevSlide = () => {
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex].pause(); // Pause video on slide change
    }
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + CustomerStories.length) % CustomerStories.length
    );
    setIsPlaying(false); // Reset play state
  };

  const nextSlide = () => {
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex].pause(); // Pause video on slide change
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % CustomerStories.length);
    setIsPlaying(false); // Reset play state
  };

  const getSlideClass = (index) => {
    const relativeIndex =
      (index - currentIndex + CustomerStories.length) % CustomerStories.length;
    switch (relativeIndex) {
      case 0:
        return styles.centerSlide;
      case 1:
        return styles.prevSlide;
      case 2:
        return styles.nextSlide;
      default:
        return styles.hiddenSlide;
    }
  };

  const handlePlayButtonClick = () => {
    const currentVideoRef = videoRefs.current[currentIndex];
    if (currentVideoRef) {
      currentVideoRef.play(); // Play the video for the current slide
      setIsPlaying(true); // Update state to indicate the video is playing
      currentVideoRef.controls = true; // Show controls when video is playing
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true); // Update state when the video starts playing
    const currentVideoRef = videoRefs.current[currentIndex];
    if (currentVideoRef) {
      currentVideoRef.controls = true; // Show controls when video is playing
    }
  };

  const handleVideoPause = () => {
    setIsPlaying(false); // Update state when the video is paused or ends
    const currentVideoRef = videoRefs.current[currentIndex];
    if (currentVideoRef) {
      currentVideoRef.controls = false; // Hide controls when video is paused
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
        Find out what our customers say about us.
      </p>
      <div className={styles.sliderContainer}>
        <div className={styles.slides}>
          {CustomerStories.map((story, index) => (
            <div
              key={index}
              className={`${styles.slide} ${getSlideClass(index)}`}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)} // Assign each video element to its ref
                src={IMAGE_BASE_URL + story.testimonial_video}
                preload="auto"
                controls={isPlaying && index === currentIndex} // Show controls only when playing
                className={styles.slideImage}
                poster={IMAGE_BASE_URL + story.thumbnail}
              />
              {getSlideClass(index) === styles.centerSlide &&
                !isPlaying && ( // Show button only on center slide and when not playing
                  <img
                    src="/assets/videoButton.png"
                    className={styles.videoButtonIcon}
                    onClick={handlePlayButtonClick} // Attach the click event
                    alt="Play Video"
                  />
                )}
            </div>
          ))}
        </div>
        <div className={styles.navigationButtons}>
          <button onClick={prevSlide}>
            <img src="/assets/leftArrow.png" alt="Previous Slide" />
          </button>
          <button onClick={nextSlide}>
            <img src="/assets/rightArrow.png" alt="Next Slide" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerStories;
