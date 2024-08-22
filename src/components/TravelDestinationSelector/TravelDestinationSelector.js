"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./TravelDestinationSelector.module.css";
import CountrySelector from "../CountrySelector/CountrySelector";
import {
  getResidentData,
  getCitizenshipData,
  getResidentCountries,
  getCitizenshipCountries,
} from "@/api/visa";
import CountryCard from "../CountryCard/CountryCard";

const TravelDestinationSelector = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef(null);

  const [residentCountriesList, setResidentCountriesList] = useState([]);
  const [citizenshipCountriesList, setCitizenshipCountriesList] = useState([]);

  const [selectedResident, setSelectedResident] = useState("");
  const [selectedCitizenship, setSelectedCitizenship] = useState("");

  const [destinations, setDestinations] = useState([]);

  const fetchCitizenshipCountriesList = async () => {
    try {
      const response = await getCitizenshipCountries();
      console.log("Citizenship countries list data:", response.data.countries);
      setCitizenshipCountriesList(response.data.countries);
    } catch (error) {
      console.error("Error fetching Citizenship countries list data:", error);
    }
  };

  const fetchResidentCountriesList = async () => {
    try {
      const response = await getResidentCountries();
      console.log("Resident countries list data:", response.data.countries);
      setResidentCountriesList(response.data.countries);
    } catch (error) {
      console.error("Error fetching Resident countries list data:", error);
    }
  };

  useEffect(() => {
    fetchResidentCountriesList();
    fetchCitizenshipCountriesList();
  }, []);

  const fetchResidentCountry = async (country) => {
    try {
      const response = await getResidentData(country);
      console.log("Resident data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Resident data:", error);
    }
  };

  const fetchCitizenshipCountry = async (country) => {
    try {
      const response = await getCitizenshipData(country);
      console.log("Citizenship data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Citizenship data:", error);
    }
  };
  const updateVisaData = (residentData, citizenshipData) => {
    const combinedData = [
      ...residentData.traditional_visas.map((visa) => ({
        ...visa,
        visa_type: "traditional",
      })),
      ...residentData.evisas.map((visa) => ({
        ...visa,
        visa_type: "e_visa",
      })),
      ...residentData.visa_free.map((visa) => ({
        ...visa,
        visa_type: "visa_free",
      })),
      ...citizenshipData.traditional_visas.map((visa) => ({
        ...visa,
        visa_type: "traditional",
      })),
      ...citizenshipData.evisas.map((visa) => ({
        ...visa,
        visa_type: "e_visa",
      })),
      ...citizenshipData.visa_free.map((visa) => ({
        ...visa,
        visa_type: "visa_free",
      })),
    ];

    console.log("combinedData", combinedData);
    setDestinations(combinedData);
  };

  useEffect(() => {
    const fetchAndMergeVisaData = async () => {
      if (selectedResident && selectedCitizenship) {
        const residentData = await fetchResidentCountry(selectedResident.name);
        const citizenshipData = await fetchCitizenshipCountry(
          selectedCitizenship.name
        );
        if (residentData && citizenshipData) {
          updateVisaData(residentData, citizenshipData);
        }
      }
    };

    fetchAndMergeVisaData();
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

  // UNIQUE DESTINATIONS
  const removeDuplicates = (destinations) => {
    const priority = {
      visa_free: 1,
      e_visa: 2,
      traditional: 3,
    };
  
    const uniqueDestinations = destinations.reduce((acc, destination) => {
      const existingDestination = acc.find(
        (d) => d.destination_country === destination.destination_country
      );
  
      if (!existingDestination) {
        acc.push(destination);
      } else if (priority[destination.visa_type] < priority[existingDestination.visa_type]) {
        const index = acc.indexOf(existingDestination);
        acc[index] = destination;
      }
  
      return acc;
    }, []);
  
    return uniqueDestinations;
  };
  

  const uniqueDestinations = removeDuplicates(destinations);
  console.log("uniqueDestinations", uniqueDestinations);

  const filteredDestinations = uniqueDestinations
    .filter((destination) => {
      if (activeFilter === "all") return true;
      return destination.visa_type.toLowerCase().includes(activeFilter);
    })
    .filter((destination) =>
      destination.destination_country
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

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
              countries={citizenshipCountriesList}
            />
            <CountrySelector
              onResidentSelect={handleResidentSelect}
              heading={"Resident"}
              countries={residentCountriesList}
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
