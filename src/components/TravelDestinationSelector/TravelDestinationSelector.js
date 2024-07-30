"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./TravelDestinationSelector.module.css";
import Link from "next/link";
import CountrySelector from "../CountrySelector/CountrySelector";

const destinations = [
  {
    country: "Portugal",
    date: "20.5.24",
    price: "850",
    visaType: "traditional",
  },
  {
    country: "Spain",
    date: "21.5.24",
    price: "900",
    visaType: "free_visa",
  },
  {
    country: "France",
    date: "22.5.24",
    price: "950",
    visaType: "traditional",
  },
  {
    country: "Portugal",
    date: "20.5.24",
    price: "850",
    visaType: "traditional",
  },
  {
    country: "Spain",
    date: "21.5.24",
    price: "900",
    visaType: "e_visa",
  },
  {
    country: "France",
    date: "22.5.24",
    price: "950",
    visaType: "free_visa",
  },
  {
    country: "Portugal",
    date: "20.5.24",
    price: "850",
    visaType: "traditional",
  },
  {
    country: "Canada",
    date: "21.5.24",
    price: "900",
    visaType: "e_visa",
  },
  {
    country: "Switzerland",
    date: "21.5.24",
    price: "900",
    visaType: "e_visa",
  },
];

const TravelDestinationSelector = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const top = containerRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight * 0.85) {
          setAnimate(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredDestinations = destinations.filter((destination) => {
    if (activeFilter === "all") {
      return destination.country
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
    return (
      destination.country.toLowerCase().includes(searchQuery.toLowerCase()) &&
      destination.visaType === activeFilter
    );
  });
  return (
    <div
      ref={containerRef}
      className={`${style.travel_Destination_selector_container} ${
        animate ? style["start-animation"] : ""
      }`}
    >
      <h1>Choose your Next Travel Destination</h1>
      <div className={style.countrySelectorContainer}>
        <input
          type="text"
          placeholder="Search Country"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className={style.countrySelector}>
          <CountrySelector />
        </div>
      </div>
      <div className={`${style.filter_container}`}>
        <div className={`${style.visa_category}`}>
          <button
            className={activeFilter === "all" ? style.active : ""}
            onClick={() => handleFilterClick("all")}
          >
            All
          </button>
        </div>
        <div className={`${style.visa_category}`}>
          <button
            className={activeFilter === "traditional" ? style.active : ""}
            onClick={() => handleFilterClick("traditional")}
          >
            Traditional Visa
          </button>
        </div>
        <div className={`${style.visa_category}`}>
          <button
            className={activeFilter === "e_visa" ? style.active : ""}
            onClick={() => handleFilterClick("e_visa")}
          >
            E-Visa
          </button>
        </div>
        <div className={`${style.visa_category}`}>
          <button
            className={activeFilter === "free_visa" ? style.active : ""}
            onClick={() => handleFilterClick("free_visa")}
          >
            Visa Free
          </button>
        </div>
      </div>

      <div className={`${style.cards_section_container}`}>
        <div className={`${style.cards_container}`}>
          {filteredDestinations.map((destination, index) => (
            <Link href={"/countrydetails"}>
              <div key={index} className={style.card}>
                <h3>{destination.country}</h3>
                <div className={`${style.card_image}`}>
                  <img src="./assets/card.png" alt={destination.country} />
                </div>
                <div className={`${style.card_date}`}>
                  <p>Get On</p>
                  <p>{destination.date}</p>
                </div>
                <div className={`${style.card_price}`}>
                  <h4>
                    {destination.price}$<span>/Person</span>
                  </h4>
                  <button className="btn-primary">Apply Now</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button className="btn-primary">See More</button>
      </div>
    </div>
  );
};

export default TravelDestinationSelector;
