"use client";

import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "./header.css";
import Link from "next/link";
import { useRouter } from "next/router";
import HeroSectionHome from "../HeroSectionHome/HeroSectionHome";
import HeroSectionOther from "../HeroSectionOther/HeroSectionOther";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { getHeaderData } from "@/api/cms.js";
import { logout } from "@/store/slices/authSlice";
import { IMAGE_BASE_URL } from "@/api/config";

const Header = ({ bannerImage }) => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuLinks, setMenuLinks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [headerLogo, setHeaderLogo] = useState("");

  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isBlogDetailsPage = router.pathname.startsWith("/blogs/");
  const isDashboardPage = router.pathname === "/dashboard";
  const isPayment = router.pathname === "/payment";
  const isLogin = router.pathname === "/login";
  const isSignUp = router.pathname === "/signup";
  const isNewPassword = router.pathname === "/newpassword";
  const isForgotPassword = router.pathname === "/forgotpassword";

  const isCountryDetailsPage = router.pathname === "/country/[countryName]";
  const isBlogPage = router.pathname === "/blogs";
  const isFAQsPage = router.pathname === "/faqs";
  const isContactUsPage = router.pathname === "/contactus";

  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const isLoggedIn =
    authState.status === "succeeded" && authState.user !== null;

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleAuthClick = async () => {
    if (isLoggedIn) {
      setShowDropdown((prev) => !prev);
    } else {
      setLoading(true);
      await router.push("/login");
      setLoading(false);
    }
  };

  const handleDropdownAction = async (action) => {
    setShowDropdown(false); // Hide the dropdown after an action
    switch (action) {
      case "viewProfile":
        await router.push("/dashboard");
        break;
      case "resetPassword":
        await router.push("/newpassword");
        break;
      case "logout":
        setLoading(true);
        dispatch(logout());
        await router.push("/");
        setLoading(false);
        break;
      default:
        break;
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchHeader = async () => {
    try {
      const response = await getHeaderData();
      const data = response.data;
      const links = [];
      for (let i = 1; i <= 5; i++) {
        const item = data[`menu_item_${i}`];
        const link = data[`menu_item_${i}_link`];
        if (item && link) {
          links.push({ label: item, url: link });
        }
      }
      setHeaderLogo(response.data.logo);
      setMenuLinks(links);
      console.log("Header Data", response.data);
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  };

  useEffect(() => {
    fetchHeader();
  }, []);

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
              <img src={IMAGE_BASE_URL + headerLogo} />
            </Link>
          </div>
          <div className="navbar-links">
            <ul>
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

          <button
            className="btn-primary auth_btn"
            onClick={() => handleAuthClick()}
          >
            <span>
              <FaUser className="icon" />
              {loading ? (
                <p>Loading...</p>
              ) : isLoggedIn ? (
                <>
                  <p> {authState.user.full_name}</p>
                </>
              ) : (
                <p> Login/Sign up</p>
              )}
            </span>
            {isLoggedIn && showDropdown && (
            <div className="avatar-dropdown" ref={dropdownRef}>
              <p onClick={() => handleDropdownAction("viewProfile")}>
                view profile
              </p>
              <p onClick={() => handleDropdownAction("resetPassword")}>
                Reset password
              </p>
              <p onClick={() => handleDropdownAction("logout")}>Logout</p>
            </div>
          )}
          </button>
         
      </nav>
      <div
        className={`hamburger animated-navbar ${isActive ? "active" : ""}`}
        onClick={handleToggle}
      >
        <span className="top"></span>
        <span className="middle"></span>
        <span className="bottom"></span>
      </div>
      {isHomePage ? (
        <HeroSectionHome />
      ) : (
        <HeroSectionOther bannerImage={bannerImage} />
      )}
    </div>
  );
};

export default Header;
