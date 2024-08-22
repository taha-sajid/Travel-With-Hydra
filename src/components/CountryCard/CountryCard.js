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
          try {
            const response = await getCountryData(destination.destination_country);
            return response.data ? response.data : null; // Return null if data is not available
          } catch (error) {
            console.error(`Error fetching data for ${destination.destination_country}:`, error);
            return null; // Return null on error
          }
        })
      );
  
      // Filter out any null responses before setting the state
      const filteredCountryData = allCountryData.filter((data) => data !== null);
      setCountryData(filteredCountryData);
      console.log("filteredCountryData", filteredCountryData);
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
  {countryData.map((data, index) => {
    const destination = destinations.find(
      (dest) => dest.destination_country === data.country.country_name
    );
    
    return (
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
            {/* Add date info here if needed */}
          </div>
          {destination && destination.visa_type !== 'visa_free' ? (
            <div className={`${style.card_price}`}>
              <h4>
                {parseFloat(data.country.price_per_person)}$
                <span>/Person</span>
              </h4>
              <button className="btn-primary">Apply Now</button>
            </div>
          ) : (
            <div className={`${style.card_price}`}>
              <h4>Visa Free</h4>
              <button className="btn-primary">View Details</button>
            </div>
          )}
        </div>
      </Link>
    );
  })}
</div>

    </div>
  );
};

export default CountryCard;
