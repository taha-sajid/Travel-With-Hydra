import React, { useEffect, useRef, useState } from "react";
import style from "./CountryCard.module.css";
import Link from "next/link";
import { getCountryData } from "@/api/visa";
import { IMAGE_BASE_URL } from "@/api/config";
import ClipLoader from "react-spinners/ClipLoader";

const CountryCard = ({ destinations }) => {
  const [countryData, setCountryData] = useState([]);
  const [visibleCards, setVisibleCards] = useState(9); // Start by showing 9 cards
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(false); // Added loading state

  console.log("destinations", destinations);
  console.log("country data", countryData);

  // Fetch data for each country and store it in the state array
  const fetchCountryData = async () => {
    setLoading(true); // Show the spinner while fetching
    setVisibleCards(9); // Reset visible cards to 9 when loading starts

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
    setLoading(false); // Hide the spinner once fetching is done
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

  // Handler to show more cards
  const handleSeeMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 9); // Show 9 more cards
  };

  return (
    <div
      ref={sectionRef}
      className={`${style.cards_section_container} ${animate ? style["start-animation"] : ""}`}
    >
      <div className={`${style.cards_container}`}>
        {loading ? ( // Conditionally render the spinner or the country cards
          <div className={style.spinner_container}>
            <ClipLoader color="#36d7b7" loading={loading} size={80} /> {/* Spinner */}
          </div>
        ) : (
          <>
            {countryData.slice(0, visibleCards).map((data, index) => {
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
                    {destination && destination.visa_type !== "visa_free" ? (
                      <div className={`${style.card_price}`}>
                        <h4>
                          £{parseFloat(data.country.price_per_person)}
                          <span>/Person</span>
                        </h4>
                        <button className="btn-primary">Apply Now</button>
                      </div>
                    ) : (
                      <div className={`${style.card_price}`}>
                        <h4>Visa Free Access</h4>
                        <button className="btn-primary">View Details</button>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}

            {/* Show "See More" button only if there are more cards to show */}
          </>
        )}
      </div>

      {/* Conditionally render the "See More" button only when not loading */}
      {!loading && countryData.length > visibleCards && (
        <div className={style.see_more_container}>
          <button className={style.see_more_button} onClick={handleSeeMore}>
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default CountryCard;
