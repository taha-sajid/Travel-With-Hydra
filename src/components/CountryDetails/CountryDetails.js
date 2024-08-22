import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentCountryForms } from "@/store/slices/authSlice";

import PaymentCard from "../PaymentCard/PaymentCard";
import styles from "./CountryDetails.module.css";

const cardData = {
  cardHeading: "Apply Now",
  isButton: true,
};

const CountryDetails = ({ country, forms }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setCurrentCountryForms(forms)); // Dispatch action to set forms
  }, [dispatch, forms]);

  console.log("authState from countryDetails", authState);

  return (
    <div>
      <div className={styles.countryDetailsContainer}>
        <div className={styles.countryDescription}>
          <h1>{country.country_name}</h1>
          <p>{country.description}</p>
        </div>
        { country.visa_type !== 'visa_free' && (
          <PaymentCard cardData={cardData} price={country.price_per_person} active={country.active} name={country.country_name} visa_type={country.visa_type} />
        )}
      </div>
    </div>
  );
};

export default CountryDetails;
