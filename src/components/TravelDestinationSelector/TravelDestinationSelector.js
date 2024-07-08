"use client";
import React, { useState } from "react";

import style from "./TravelDestinationSelector.module.css";

const destinations = [
  {
    country: "Portugal",
    date: "20.5.24",
    price: "850$/Person",
    visaType: "traditional",
  },
  {
    country: "Spain",
    date: "21.5.24",
    price: "900$/Person",
    visaType: "free_visa",
  },
  {
    country: "France",
    date: "22.5.24",
    price: "950$/Person",
    visaType: "traditional",
  },
  {
    country: "Portugal",
    date: "20.5.24",
    price: "850$/Person",
    visaType: "traditional",
  },
  {
    country: "Spain",
    date: "21.5.24",
    price: "900$/Person",
    visaType: "e_visa",
  },
  {
    country: "France",
    date: "22.5.24",
    price: "950$/Person",
    visaType: "free_visa",
  },
  {
    country: "Portugal",
    date: "20.5.24",
    price: "850$/Person",
    visaType: "traditional",
  },
  {
    country: "Canada",
    date: "21.5.24",
    price: "900$/Person",
    visaType: "e_visa",
  },
  {
    country: "Switzerland",
    date: "21.5.24",
    price: "900$/Person",
    visaType: "e_visa",
  },
];

const TravelDestinationSelector = () => {
  const [activeFilter, setActiveFilter] = useState("traditional");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredDestinations = destinations.filter((destination) => {
    return (
      destination.country.toLowerCase().includes(searchQuery.toLowerCase()) &&
      destination.visaType === activeFilter
    );
  });
  return (
    <div className={`${style.travel_Destination_selector_container}`}>
      <h1>Choose your Next Travel Destination</h1>

      <input
        type="text"
        placeholder="Search Country"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <div className={`${style.filter_container}`}>
        <div className={`${style.traditional_visa}`}>
          <button
            className={activeFilter === "traditional" ? style.active : ""}
            onClick={() => handleFilterClick("traditional")}
          >
            Traditional Visa
          </button>
        </div>
        <div className={`${style.e_visa}`}>
          <button
            className={activeFilter === "e_visa" ? style.active : ""}
            onClick={() => handleFilterClick("e_visa")}
          >
            E-Visa
          </button>
        </div>
        <div className={`${style.free_visa}`}>
          <button
            className={activeFilter === "free_visa" ? style.active : ""}
            onClick={() => handleFilterClick("free_visa")}
          >
            Visa Free
          </button>
        </div>
      </div>

      <div className={`${style.cards_container}`}>
        {filteredDestinations.map((destination, index) => (
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
              <h4>{destination.price}</h4>
              <button className="btn-primary">Apply Now</button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary">See More</button>
    </div>
  );
};

export default TravelDestinationSelector;
