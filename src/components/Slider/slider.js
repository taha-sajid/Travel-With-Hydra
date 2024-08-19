import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import style from "./slider.module.css";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { IMAGE_BASE_URL } from "@/api/config";
import { getAllCountryData } from "@/api/visa";

const Slider = () => {
  const router = useRouter();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [allCountryData, setAllCountryData] = useState([]);

  const carouselContentRef = useRef(null);

  const fetchAllCountryData = async () => {
    try {
      const response = await getAllCountryData();
      console.log("get all countries data:", response.data);

      if (response.data && Array.isArray(response.data.countries)) {
        setAllCountryData(response.data.countries);
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching get all countries data:", error);
    }
  };

  useEffect(() => {
    fetchAllCountryData();
  }, []);

  useEffect(() => {
    console.log("Customer stories", allCountryData);
  }, [allCountryData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(style.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (carouselContentRef.current) {
      observer.observe(carouselContentRef.current);
    }

    return () => {
      if (carouselContentRef.current) {
        observer.unobserve(carouselContentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleAnimationEnd = () => {
      setAnimationComplete(true);
    };

    if (carouselContentRef.current) {
      carouselContentRef.current.addEventListener(
        "animationend",
        handleAnimationEnd
      );

      return () => {
        if (carouselContentRef.current) {
          carouselContentRef.current.removeEventListener(
            "animationend",
            handleAnimationEnd
          );
        }
      };
    }
  }, []);

  useEffect(() => {
    if (animationComplete && carouselContentRef.current) {
      carouselContentRef.current.classList.remove(style.carousel_content);
    }
  }, [animationComplete]);

  // Handle card click to navigate to the specific country route
  const handleCardClick = (event, countryName) => {
    const encodedCountryName = encodeURIComponent(countryName);
    const url = `/country/${encodedCountryName}`;

    if (event.ctrlKey || event.metaKey) {
      window.open(url, "_blank");
    } else {
      router.push(url);
    }
  };

  return (
    <div className={style.slider_section_container}>
      <div className={`${style.slider_container}`}>
        <div className={`${style.slider_heading}`}>
          <h1>Top Travel Destinations</h1>
        </div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className={`${style.carousel_container} w-full max-w-sm`}
        >
          <CarouselContent
            ref={carouselContentRef}
            className={`${style.carousel_content} sm: -ml-2 md:-ml-4`}
          >
            {allCountryData.map((country, index) => (
              <CarouselItem
                key={index}
                className={`${style.carousel_item} w-full md:basis-1/2 lg:basis-1/3`}
              >
                <div
                  className="p-1"
                  onClick={(event) =>
                    handleCardClick(event, country.country_name)
                  }
                >
                  <div className={`${style.carousel_card_container}`}>
                    <img
                      src={IMAGE_BASE_URL + country.banner}
                      alt={country.country_name}
                    />
                    <h3>{country.country_name}</h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className={`${style.carousel_btn_container}`}>
            <CarouselNext className={`${style.next_btn}`} />
            <CarouselPrevious className={`${style.prev_btn}`} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
