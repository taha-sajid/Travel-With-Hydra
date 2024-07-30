"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import "./header.css";
import Link from "next/link";
import { useRouter } from "next/router";
import HeroSectionHome from "../HeroSectionHome/HeroSectionHome";
import HeroSectionOther from "../HeroSectionOther/HeroSectionOther";

import { FaUser } from "react-icons/fa";
import CountrySelector from "../CountrySelector/CountrySelector";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isBlogDetailsPage = router.pathname.startsWith("/blogs/");
  const isDashboardPage = router.pathname === "/dashboard";
  const isPayment = router.pathname === "/payment";
  const isLogin = router.pathname === "/login";
  const isSignUp = router.pathname === "/signup";
  const isNewPassword = router.pathname === "/newpassword";
  const isForgotPassword = router.pathname === "/forgotpassword";

  const isCountryDetailsPage = router.pathname === "/countrydetails";
  const isBlogPage = router.pathname === "/blogs";
  const isFAQsPage = router.pathname === "/faqs";
  const isContactUsPage = router.pathname === "/contactus";

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isActive]);

  const headerClass1 =
    isBlogDetailsPage ||
    isDashboardPage ||
    isPayment ||
    isLogin ||
    isSignUp ||
    isForgotPassword ||
    isNewPassword
      ? "header-with-border"
      : "header-container";

  const headerClass2 =
    isCountryDetailsPage || isFAQsPage || isBlogPage || isContactUsPage
      ? "hero-section-other-header-container"
      : "";

  return (
    <div
      className={`${headerClass1} ${headerClass2} ${
        isBlogDetailsPage && "header-without-border"
      }`}
      style={isHomePage ? { overflowX: "hidden" } : { overflowX: "unset" }}
    >
      <nav
        className={`${
          isActive ? "active" : ""
        } navbar-container animated-navbar`}
      >
        <div className="logo-and-links-wrapper">
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
        </div>
        {/* <div className="signInButtonContainer"> */}
        <button className="btn-primary auth_btn" onClick={handleLogin}>
          <span>
            <FaUser className="icon" /> <p> Login/Sign up</p>
          </span>
        </button>
        {/* </div> */}
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
