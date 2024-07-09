"use client";

import React, { useState, useEffect, useRef } from "react";
import style from "./slider.module.css";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slider = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const carouselContentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(style.visible);
            observer.unobserve(entry.target); // Stop observing after it's visible
          }
        });
      },
      { threshold: 0.1 } // Adjust this threshold as needed
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
        carouselContentRef.current.removeEventListener(
          "animationend",
          handleAnimationEnd
        );
      };
    }
  }, []);
  useEffect(() => {
    if (animationComplete && carouselContentRef.current) {
      carouselContentRef.current.classList.remove(style.carousel_content);
    }
  }, [animationComplete]);

  return (
    <div className={`${style.slider_container}`}>
      <div className={`${style.slider_heading}`}>
        <h1> Top Travel Destinations</h1>
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
          className={`${style.carousel_content} animate-accordion-down`}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className={`${style.carousel_card_container}`}>
                  <img src="./assets/slider.png" />
                  <h3>Bali, Indonesia</h3>
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
  );
};

export default slider;
