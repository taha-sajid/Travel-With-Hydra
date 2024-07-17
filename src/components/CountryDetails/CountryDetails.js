import React, { useState } from "react";
import styles from "./CountryDetails.module.css";
import Header from "../Header/header";
import Footer from "../Footer/Footer";

const CountryDetails = () => {
  const [applicantCount, setApplicantCount] = useState(1);

  const handleIncrement = () => {
    setApplicantCount(applicantCount + 1);
  };

  const handleDecrement = () => {
    if (applicantCount > 1) {
      setApplicantCount(applicantCount - 1);
    }
  };

  const visaFees = 850;
  const serviceFees = 40; // Assuming $40 as service fees
  const totalAmount = visaFees * applicantCount + serviceFees;

  return (
    <div>
      <Header />
      <div className={styles.countryDetailsContainer}>
        <div className={styles.countryDescription}>
          <h1>Portugal</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Rutrum nec lectus dui
            dignissim lorem consectetur a...
          </p>
        </div>
        <div className={styles.applyNowContainer}>
          <div className={styles.applyNowCard}>
            <h2>Apply Now</h2>
            <div className={styles.formGroup}>
              <label>No of Applicant</label>
              <div className={styles.inputGroup}>
                <button
                  className={styles.counterButton}
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  type="number"
                  value={applicantCount}
                  readOnly
                  className={styles.input}
                />
                <button
                  className={styles.counterButton}
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Price</label>
              <div className={styles.priceDetails}>
                <span>Visa Fees</span>
                <span>
                  ${visaFees}x{applicantCount}
                </span>
              </div>
            </div>
            <div className={styles.totalAmount}>
              <span>Total Amount</span>
              <span>${totalAmount}</span>
            </div>
            <button className={styles.startApplicationButton}>
              Start Application
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CountryDetails;
