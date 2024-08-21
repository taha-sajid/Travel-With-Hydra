import CountryDetails from "@/components/CountryDetails/CountryDetails";
import React from "react";
import Header from "@/components/Header/header";
import styles from "./countrydetails.module.css";
import Footer from "@/components/Footer/Footer";
import BlogsCard from "@/components/BlogsCard/BlogsCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCountryData } from "@/api/visa";

const blogsCardData = {
  heading: "Related Blogs",
  shortDescription: "Explore our latest blogs from our active users",
};

function capitalizeFirstLetter(text) {
  if (!text) return text; // Handle empty strings or null/undefined
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

const index = () => {
  const [countryDetails, setCountryDetails] = useState(null);

  console.log("countryDetails", countryDetails);
  const router = useRouter();
  const { countryName } = router.query;
  const pathname = router.pathname;
  console.log(pathname);
  const fetchCountry = async (country) => {
    console.log("this is country", country);
    const countryName = capitalizeFirstLetter(country);
    try {
      const response = await getCountryData(countryName);
      console.log("country data:", response.data);
      setCountryDetails(response.data);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    if (countryName) {
      fetchCountry(countryName);
    }
  }, [countryName]);

  if (!countryDetails) return <p>Loading...</p>;

  const { country, forms } = countryDetails;
  console.log("object", country, countryDetails);
  return (
    <div>
      <Header bannerImage={country.banner} />
      <div className={styles.countryDetailsContainer}>
        <CountryDetails country={country} forms={forms} />
      </div>
      <div className={styles.blogsCardContainer}>
        <BlogsCard cardData={blogsCardData} />
      </div>
      <Footer />
    </div>
  );
};

export default index;
