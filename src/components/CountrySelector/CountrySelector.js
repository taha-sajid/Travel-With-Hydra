import { IMAGE_BASE_URL } from "@/api/config";
import React, { useState, useEffect, useRef } from "react";

const CountrySelector = ({
  onCitizenshipSelect,
  onResidentSelect,
  heading,
  countries = [],
}) => {
  const [selectedCountry, setSelectedCountry] = useState({});
  const [confirmedCountry, setConfirmedCountry] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const countrySelectorRef = useRef(null);
  const dropdownRef = useRef(null);
  const observerRef = useRef(null);

  // Save selected country to localStorage
  const saveCountryToLocalStorage = (key, country) => {
    localStorage.setItem(key, JSON.stringify(country));
  };

  // Load country from localStorage
  const loadCountryFromLocalStorage = (key) => {
    const savedCountry = localStorage.getItem(key);
    return savedCountry ? JSON.parse(savedCountry) : null;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsCountrySelectorOpen(false);
  };

  const toggleCountrySelector = (event) => {
    event.stopPropagation();
    setIsCountrySelectorOpen(!isCountrySelectorOpen);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsCountrySelectorOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      countrySelectorRef.current &&
      !countrySelectorRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
      setIsCountrySelectorOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isActive]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const savedCountry = loadCountryFromLocalStorage(heading);
    if (savedCountry) {
      setSelectedCountry(savedCountry);
      setConfirmedCountry(savedCountry);
    } else if (countries.length > 0) {
      setSelectedCountry(countries[0]);
      setConfirmedCountry(countries[0]);
    }
  }, [countries, heading]);

  useEffect(() => {
    if (onCitizenshipSelect) onCitizenshipSelect(confirmedCountry);
    if (onResidentSelect) onResidentSelect(confirmedCountry);
  }, [confirmedCountry, onCitizenshipSelect, onResidentSelect]);

  const handleConfirm = () => {
    setConfirmedCountry(selectedCountry);
    setIsDropdownOpen(false);

    // Save the confirmed country to localStorage
    saveCountryToLocalStorage(heading, selectedCountry);

    if (heading === "Citizenship" && onCitizenshipSelect) {
      onCitizenshipSelect(selectedCountry); // Ensure this is called with the selectedCountry
    } else if (heading === "Resident" && onResidentSelect) {
      onResidentSelect(selectedCountry); // Ensure this is called with the selectedCountry
    }
  };

  return (
    <div
      ref={observerRef}
      className={`navbar-avatar ${isActive ? "active" : ""} ${
        isAnimated ? "animated-avatar" : ""
      }`}
    >
      <div ref={dropdownRef} className="my-avatar">
        <button onClick={toggleDropdown} className="avatar-button">
          <img
            src={IMAGE_BASE_URL + (confirmedCountry.flag || "")}
            alt="Avatar"
            className="avatar"
          />
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-heading">
              <h3>Confirm {heading}</h3>
              <p>
                This determines your visa requirements, and where you can travel
                visa-free.
              </p>
            </div>
            <div ref={countrySelectorRef} className="dropdown-country-selector">
              <div className="selected-country" onClick={toggleCountrySelector}>
                <img
                  src={IMAGE_BASE_URL + selectedCountry.flag || ""}
                  alt={selectedCountry.name || ""}
                  className="country-flag"
                />
                <span className="country-name">
                  {selectedCountry.name || ""}
                </span>
                <span
                  className={`dropdown-arrow ${
                    isCountrySelectorOpen ? "open" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {isCountrySelectorOpen && (
                <div className="country-list">
                  {countries
                    .filter((country) => country.name !== selectedCountry.name)
                    .map((country, index) => (
                      <div
                        key={index}
                        className="country-item"
                        onClick={() => handleSelectCountry(country)}
                      >
                        <img
                          src={IMAGE_BASE_URL + country.flag}
                          alt={country.name}
                          className="country-flag"
                        />
                        <span className="country-name">{country.name}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <button className="btn-primary" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountrySelector;
