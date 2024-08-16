"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./TravelDestinationSelector.module.css";
import CountrySelector from "../CountrySelector/CountrySelector";
import {
  getResidentData,
  getCitizenshipData,
  getCountryData,
} from "@/api/visa";
import CountryCard from "../CountryCard/CountryCard";

const TravelDestinationSelector = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef(null);
  const [selectedResident, setSelectedResident] = useState("");
  const [selectedCitizenship, setSelectedCitizenship] = useState("");

  const [mergedVisaData, setMergedVisaData] = useState({
    traditional_visas: [],
    evisas: [],
    visa_free: [],
  });
 

  const fetchResidentCountry = async (country) => {
    try {
      setMergedVisaData({
        traditional_visas: [],
        evisas: [],
        visa_free: [],
      });
      const response = await getResidentData(country);
      console.log("Resident data:", response.data);
      mergeVisaData(response.data, "resident");
    } catch (error) {
      console.error("Error fetching Resident data:", error);
    }
  };

  const fetchCitizenshipCountry = async (country) => {
    try {
      setMergedVisaData({
        traditional_visas: [],
        evisas: [],
        visa_free: [],
      });
      const response = await getCitizenshipData(country);
      console.log("Citizenship data:", response.data);
      mergeVisaData(response.data, "citizenship");
    } catch (error) {
      console.error("Error fetching citizenship data:", error);
    }
  };

  const mergeVisaData = (data, source) => {
    setMergedVisaData((prevData) => {
      const traditionalCountries = new Set(
        prevData.traditional_visas.map((visa) => visa.destination_country)
      );
      const evisaCountries = new Set(
        prevData.evisas.map((visa) => visa.destination_country)
      );
      const visaFreeCountries = new Set(
        prevData.visa_free.map((visa) => visa.destination_country)
      );

      const mergedTraditionalVisas = [
        ...prevData.traditional_visas,
        ...data.traditional_visas.filter(
          (visa) => !traditionalCountries.has(visa.destination_country)
        ),
      ];

      const mergedEVisas = [
        ...prevData.evisas,
        ...data.evisas.filter(
          (visa) => !evisaCountries.has(visa.destination_country)
        ),
      ];

      const mergedVisaFree = [
        ...prevData.visa_free,
        ...data.visa_free.filter(
          (visa) => !visaFreeCountries.has(visa.destination_country)
        ),
      ];

      return {
        traditional_visas: mergedTraditionalVisas,
        evisas: mergedEVisas,
        visa_free: mergedVisaFree,
      };
    });
  };

  useEffect(() => {
    if (selectedResident) {
      fetchResidentCountry(selectedResident.name);
    }
    if (selectedCitizenship) {
      fetchCitizenshipCountry(selectedCitizenship.name);
    }
  }, [selectedResident, selectedCitizenship]);

  const handleResidentSelect = (Resident) => {
    setSelectedResident(Resident);
  };

  const handleCitizenshipSelect = (Citizenship) => {
    console.log("successfully updated", Citizenship);
    setSelectedCitizenship(Citizenship);
  };

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

  const filteredDestinations = (() => {
    if (activeFilter === "all") {
      return [
        ...mergedVisaData.traditional_visas,
        ...mergedVisaData.evisas,
        ...mergedVisaData.visa_free,
      ].filter((destination) =>
        destination.destination_country
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    return mergedVisaData[`${activeFilter}`].filter((destination) =>
      destination.destination_country
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  })();

  useEffect(() => {
    console.log("Filtered Destinations Updated:", filteredDestinations);
  }, [filteredDestinations]);

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
        <div className={style.countrySelectorSection}>
          <div className={style.countrySelector}>
            <CountrySelector
              onCitizenshipSelect={handleCitizenshipSelect}
              heading={"Citizenship"}
            />
            <CountrySelector
              onResidentSelect={handleResidentSelect}
              heading={"Resident"}
            />
          </div>
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
            className={activeFilter === "traditional_visas" ? style.active : ""}
            onClick={() => handleFilterClick("traditional_visas")}
          >
            Traditional Visa
          </button>
        </div>
        <div className={`${style.visa_category}`}>
          <button
            className={activeFilter === "evisas" ? style.active : ""}
            onClick={() => handleFilterClick("evisas")}
          >
            E-Visa
          </button>
        </div>
        <div className={`${style.visa_category}`}>
          <button
            className={activeFilter === "visa_free" ? style.active : ""}
            onClick={() => handleFilterClick("visa_free")}
          >
            Visa Free
          </button>
        </div>
      </div>
      <CountryCard destinations={filteredDestinations} />
    </div>
  );
};

export default TravelDestinationSelector;
