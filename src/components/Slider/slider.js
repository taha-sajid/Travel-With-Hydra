"use client";

import React from "react";
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
  return (
    <div className={`${style.slider_container}`}>
      <div className={`${style.slider_heading}`}>
        <h1> Top Travel Destinations</h1>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className={`${style.carousel_container} w-full max-w-sm`}
      >
        <CarouselContent>
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
