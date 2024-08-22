import React, { useState, useEffect } from "react";
import styles from "./FilterSelector.module.css";
import { getAllCountryData } from "@/api/visa";


const Filter = () => {
  const [countries, setCountries] = useState([]);

  // Function to fetch countries from API and update state
  const fetchAllCountryData = async () => {
    try {
      const response = await getAllCountryData();
      console.log("get all countries data:", response.data);

      if (response.data && Array.isArray(response.data.countries)) {
        setCountries(response.data.countries); // Set country data
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching get all countries data:", error);
    }
  };

  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    fetchAllCountryData();
  }, []);

  return (
    <div className={styles.dropdown}>
      <input
        type="checkbox"
        className={styles.dropdownSwitch}
        id="filter-switch"
        hidden
      />
      <label htmlFor="filter-switch" className={styles.dropdownOptionsFilter}>
        <ul className={styles.dropdownFilter} role="listbox" tabIndex="-1">
          <li className={styles.dropdownFilterSelected} aria-selected="true">
            Country
          </li>
          <li>
            <ul className={styles.dropdownSelect}>
              {countries.length > 0 ? (
                countries.map((country, index) => (
                  <li
                    key={index}
                    className={`${styles.dropdownSelectOption} ${index === 0 ? styles.active : ''}`}
                    role={country.country_name}
                  >
                    {country.country_name}
                  </li>
                ))
              ) : (
                <li className={styles.dropdownSelectOption}>
                  No countries available
                </li>
              )}
            </ul>
          </li>
        </ul>
      </label>
    </div>
  );
};

export default Filter;
