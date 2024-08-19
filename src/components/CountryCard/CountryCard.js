import React, { useEffect, useRef, useState } from "react";
import style from "./CountryCard.module.css";
import Link from "next/link";
import { getCountryData } from "@/api/visa";
import { IMAGE_BASE_URL } from "@/api/config";

const CountryCard = ({ destinations }) => {
  const [countryData, setCountryData] = useState([]);
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);
  console.log("destinations", destinations);
  console.log("country data", countryData);

  // Fetch data for each country and store it in the state array
  const fetchCountryData = async () => {
    try {
      const allCountryData = await Promise.all(
        destinations.map(async (destination) => {
          const response = await getCountryData(
            destination.destination_country
          );
          return response.data; // Assuming response.data contains the country data
        })
      );
      setCountryData(allCountryData);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    fetchCountryData(); // Fetch data whenever destinations change
  }, [destinations]);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const top = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight + 200) {
          setAnimate(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log(countryData);
  }, [countryData]);

  return (
    <div
      ref={sectionRef}
      className={`${style.cards_section_container} ${
        animate ? style["start-animation"] : ""
      }`}
    >
      <div className={`${style.cards_container}`}>
        {countryData.map((data, index) => (
          <Link
            href={`/country/${data.country.country_name.toLowerCase()}`}
            key={index}
          >
            <div className={style.card}>
              <h3>{data.country.country_name}</h3>
              <div className={`${style.card_image}`}>
                <img
                  src={IMAGE_BASE_URL + data.country.banner}
                  alt={data.country.country_name}
                />
              </div>
              <div className={`${style.card_date}`}>
                <p>Get On</p>
                <p>20.5.2024</p>
              </div>
              <div className={`${style.card_price}`}>
                <h4>
                  {parseFloat(data.country.price_per_person)}$
                  <span>/Person</span>
                </h4>
                <button className="btn-primary">Apply Now</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button className="btn-primary">See More</button>
    </div>
  );
};

export default CountryCard;
