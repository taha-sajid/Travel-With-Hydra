"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import "./header.css";
import Link from "next/link";
import { useRouter } from "next/router";
import HeroSectionHome from "../HeroSectionHome/HeroSectionHome";
import HeroSectionOther from "../HeroSectionOther/HeroSectionOther";
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

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const dropdownRef = useRef(null);
  const countrySelectorRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isBlogDetailsPage = router.pathname.startsWith("/blogs/");
  const isDashboardPage = router.pathname === "/dashboard";
  const isPayment = router.pathname === "/payment";

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
    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isActive]);

  const headerClass =
    isBlogDetailsPage || isDashboardPage || isPayment ? "" : "header-container";

  return (
    <div
      className={headerClass}
      style={isHomePage ? { overflowX: "hidden" } : { overflowX: "unset" }}
    >
      <nav
        className={`${
          isActive ? "active" : ""
        } navbar-container animated-navbar`}
      >
        <div className="navbar-logo">
          <Link href={"/"}>
            <img src="/assets/logo.png" />
          </Link>
        </div>
        <div className="navbar-links">
          <ul>
            <li>
              <Link href={"/blogs"}> BLOGS</Link>
            </li>
            <li>
              <Link href={"/faqs"}> FAQs</Link>
            </li>
            <li>
              <Link href={"/contactus"}> CONTACT US</Link>
            </li>
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
        </div>
        <Link href="/login">
          <button className="btn-primary auth_btn">
            <img src="/assets/user-avatar.png" /> Login/Sign up
          </button>
        </Link>
      </nav>
      <div
        className={`hamburger animated-navbar ${isActive ? "active" : ""}`}
        onClick={handleToggle}
      >
        <span className="top"></span>
        <span className="middle"></span>
        <span className="bottom"></span>
      </div>
      {isHomePage ? <HeroSectionHome /> : <HeroSectionOther />}
    </div>
  );
};

export default Header;
