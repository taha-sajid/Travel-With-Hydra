import React, { useState } from "react";
import styles from "./PaymentCard.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { useRouter } from "next/router";

const PaymentCard = ({ cardData }) => {
  const [applicantCount, setApplicantCount] = useState(1);
  const { cardHeading, isButton } = cardData;

  const router = useRouter();
  const isPayment = router.pathname === "/payment";

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
    <div className={styles.applyNowContainer}>
      <div className={styles.applyNowCard}>
        <h2>{cardHeading}</h2>
        <div className={styles.applicantFormGroup}>
          <div className={styles.inputGroup}>
            <img src="/assets/user.png" alt="User icon" />
            <label>No of Applicant</label>
          </div>
          <div className={styles.inputGroup}>
            {/* <button
        className={styles.counterButton}
        onClick={handleDecrement}
      >
        -
      </button> */}
            <FiMinusCircle
              onClick={handleDecrement}
              className={styles.counterIcon}
            />

            <p className={styles.applicantCount}>{applicantCount}</p>
            {/* <button
        className={styles.counterButton}
        onClick={handleIncrement}
      >
        +
      </button> */}

            <FiPlusCircle
              onClick={handleIncrement}
              className={styles.counterIcon}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Price</label>
          <div className={styles.priceDetails}>
            <span>
              <img src="/assets/visaIcon.png" /> <p> Visa Fees</p>
            </span>
            <span>
              ${visaFees}x{applicantCount}
            </span>
          </div>
        </div>
        <div
          className={styles.totalAmount}
          style={isPayment ? { marginBottom: 0 } : {}}
        >
          <span>Total Amount</span>
          <span>${totalAmount}</span>
        </div>
        {isButton && (
          <button className={styles.startApplicationButton}>
            Start Application
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
