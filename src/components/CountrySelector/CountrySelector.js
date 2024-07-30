import React from "react";
import { useState, useEffect, useRef } from "react";

const countries = [
  { name: "United Kingdom", flag: "/assets/flags/uk.png" },
  { name: "Germany", flag: "/assets/flags/de.png" },
  { name: "Romania", flag: "/assets/flags/ro.png" },
  { name: "India", flag: "/assets/flags/in.png" },
  { name: "Pakistan", flag: "/assets/flags/pk.png" },
  { name: "Bangladesh", flag: "/assets/flags/bd.png" },
  { name: "Iran", flag: "/assets/flags/ir.png" },
  { name: "China", flag: "/assets/flags/cn.png" },
];

const CountrySelector = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const countrySelectorRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsCountrySelectorOpen(false);
  };

  const toggleCountrySelector = (event) => {
    event.stopPropagation();
    setIsCountrySelectorOpen(!isCountrySelectorOpen);
  };

  const handleSelectCountry = (country, event) => {
    event.stopPropagation();
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

  return (
    <div className={`navbar-avatar ${isActive ? "active" : ""}`}>
      <div ref={dropdownRef} className="my-avatar">
        <button onClick={toggleDropdown} className="avatar-button">
          <img src="/assets/avatar.png" alt="Avatar" className="avatar" />
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-heading">
              <h3>Confirm Citizenship</h3>
              <p>
                This determines your visa requirements, and where you can travel
                visa-free.
              </p>
            </div>
            <div ref={countrySelectorRef} className="dropdown-country-selector">
              <div className="selected-country" onClick={toggleCountrySelector}>
                <img
                  src={selectedCountry.flag}
                  alt={selectedCountry.name}
                  className="country-flag"
                />
                <span className="country-name">{selectedCountry.name}</span>
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
                          src={country.flag}
                          alt={country.name}
                          className="country-flag"
                        />
                        <span className="country-name">{country.name}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <button className="btn-primary">Confirm</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountrySelector;
