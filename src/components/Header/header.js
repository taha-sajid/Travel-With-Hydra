"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import "./header.css";
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

const images = [
  "/assets/illus1.png",
  "/assets/illus2.png",
  "/assets/illus3.png",
  "/assets/illus4.png",
];

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const dropdownRef = useRef(null);
  const countrySelectorRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

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
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-container">
      <nav className="navbar-container animated-navbar">
        <div className="navbar-logo">
          <img src="/assets/logo.png" />
        </div>
        <div className="navbar-links">
          <ul>
            <li>BLOGS</li>
            <li>FAQs</li>
            <li>CONTACT US</li>
          </ul>
        </div>
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
                    This determines your visa requirements, and where you can
                    travel visa-free.
                  </p>
                </div>
                <div
                  ref={countrySelectorRef}
                  className="dropdown-country-selector"
                >
                  <div
                    className="selected-country"
                    onClick={toggleCountrySelector}
                  >
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
                        .filter(
                          (country) => country.name !== selectedCountry.name
                        )
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
          <div
            className={`hamburger ${isActive ? "active" : ""}`}
            onClick={handleToggle}
          >
            <span class="top"></span>
            <span class="middle"></span>
            <span class="bottom"></span>
          </div>
          <button className="btn-primary">
            <img src="/assets/user-avatar.png" /> Login/Sign up
          </button>
        </div>
      </nav>
      <div className="hero-section-container">
        <div className="hero-section-heading animated-hero-left">
          <h1>Discover the world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Id mi erat faucibus ac est
            metus tristique. Semper sapien metus elit diam in id. Pretium congue
            ridiculus bibendum magna pellentesque
          </p>
        </div>
        <div className="hero-section-image animated-hero-right">
          <img
            src={images[currentImageIndex]}
            alt="Hero"
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
