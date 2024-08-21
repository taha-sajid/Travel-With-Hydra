import React, { useState } from "react";
import styles from "./PaymentCard.module.css";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const PaymentCard = ({ cardData, price, active }) => {
  const [applicantCount, setApplicantCount] = useState(1);
  const { cardHeading, isButton } = cardData;

  const authState = useSelector((state) => state.auth);
  const { user, status } = authState;

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

  const visaFees = price;
  const totalAmount = visaFees * applicantCount;

  const handleClick = () => {
    if (user && status === "succeeded") {
      router.push("/visaapplicationform");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={styles.applyNowContainer}>
      <div className={styles.applyNowCard}>
        {active && (
        <>
        <h2>{cardHeading}</h2>
        <div className={styles.applicantFormGroup}>
          <div className={styles.inputGroup}>
            <img src="/assets/user.png" alt="User icon" />
            <label>No of Applicant</label>
          </div>
          <div className={styles.inputGroup}>
            <FiMinusCircle
              onClick={handleDecrement}
              className={styles.counterIcon}
            />
            <p className={styles.applicantCount}>{applicantCount}</p>
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
              <img src="/assets/visaIcon.png" alt="Visa icon" />{" "}
              <p> Visa Fees</p>
            </span>
            <span>
              ${parseFloat(visaFees)} x {applicantCount}
            </span>
          </div>
        </div>
        <div
          className={styles.totalAmount}
          style={isPayment ? { marginBottom: 0 } : {}}
        >
          <span>Total Amount</span>
          <span>$ {parseFloat(totalAmount)}</span>
        </div>
        </>
        )}
        {active ? (
        <>
          {isButton && (
            <Link href={"/visaapplicationform"}>
              <button className={styles.startApplicationButton}>
                Start Application
              </button>
            </Link>
          )}
        </>
      ) : (
        <button className={styles.wishlistButton}>
          Add to Wishlist
        </button>
      )}
      </div>
    </div>
  );
};

export default PaymentCard;
