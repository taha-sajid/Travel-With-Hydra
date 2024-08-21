import React, { useState, useEffect } from "react";
import styles from "./PaymentCard.module.css";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import { getMyWishlist, addToWishlist } from "@/api/visa";
import { useAuthToken } from "@/api/customHooks";



const PaymentCard = ({ cardData, price, active, name }) => {
  const [applicantCount, setApplicantCount] = useState(1);
  const { cardHeading, isButton } = cardData;

  const authState = useSelector((state) => state.auth);
  const { user, status } = authState;

  const router = useRouter();
  const isPayment = router.pathname === "/payment";
  const [wishlist, setWishlist] = useState([]);

  const token = useAuthToken();
  const fetchWishlist = async () => {
    try {
      const response = await getMyWishlist(token);

      if (response.data && Array.isArray(response.data)) {
        setWishlist(response.data);
        console.log("wishlist", response.data);
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching get all applications data:", error);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, []);

  const isCountryInWishlist = (country) => {
    return wishlist.some(item => item.country === country);
  };
  const isDisabled = isCountryInWishlist(name);

  const handleWishlist = async () => {
    try {
      const response = await addToWishlist(token, name);
      console.log("wishlist", response);
      fetchWishlist();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

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
        <button className={`${styles.wishlistButton} ${isDisabled ? styles.disabled : ''}`} disabled={isDisabled} onClick={handleWishlist}>
          Add to Wishlist
        </button>
      )}
      </div>
    </div>
  );
};

export default PaymentCard;
