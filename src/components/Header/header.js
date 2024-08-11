"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import "./header.css";
import Link from "next/link";
import { useRouter } from "next/router";
import HeroSectionHome from "../HeroSectionHome/HeroSectionHome";
import HeroSectionOther from "../HeroSectionOther/HeroSectionOther";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { getHeaderData, getFooterData, getHeroData } from "@/api/cms.js";
import { logout } from "@/store/slices/authSlice";

const Header = ({ bannerImage }) => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const isLoggedIn =
    authState.status === "succeeded" && authState.user !== null;

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleAuthClick = async () => {
    if (isLoggedIn) {
      setLoading(true);
      dispatch(logout());
      await router.push("/");
      setLoading(false);
    } else {
      setLoading(true);
      await router.push("/login");
      setLoading(false);
    }
  };

  const fetchHeader = async () => {
    try {
      const response = await getHeaderData();
      console.log("Header data:", response.data);
      // setData(response.data);
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  };
  fetchHeader();

  const fetchFooter = async () => {
    try {
      const response = await getFooterData();
      console.log("Footer data:", response.data);
    } catch (error) {
      console.error("Error fetching footer data:", error);
    }
  };
  fetchFooter();

  const fetchHeroData = async () => {
    try {
      const response = await getHeroData();
      console.log("Hero data:", response.data);
    } catch (error) {
      console.error("Error fetching Hero data:", error);
    }
  };

  fetchHeroData();

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
        <button className="btn-primary auth_btn" onClick={handleAuthClick}>
          <span>
            <FaUser className="icon" />
            {loading ? (
              <p>Loading...</p>
            ) : isLoggedIn ? (
              <p> Logout</p>
            ) : (
              <p> Login/Sign up</p>
            )}
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
      {isHomePage ? (
        <HeroSectionHome />
      ) : (
        <HeroSectionOther bannerImage={bannerImage} />
      )}
    </div>
  );
};

export default Header;
