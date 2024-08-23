import React, { useState, useEffect } from "react";
import styles from "./PaymentCard.module.css";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import { getCitizenshipData, getResidentData, getMyWishlist, addToWishlist } from "@/api/visa";
import { useAuthToken } from "@/api/customHooks";

const PaymentCard = ({ cardData, price, active, name, visa_type }) => {
  const [applicantCount, setApplicantCount] = useState(1);
  const [residentVisaType, setResidentVisaType] = useState(null);
  const [citizenshipVisaType, setCitizenshipVisaType] = useState(null);
  const [highestPriorityVisaType, setHighestPriorityVisaType] = useState(null);
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
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  const isCountryInWishlist = (country) => {
    return wishlist.some((item) => item.country === country);
  };

  const isDisabled = isCountryInWishlist(name);

  const handleWishlist = async () => {
    try {
      await addToWishlist(token, name);
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
      dispatch(setApplicantsCount(applicantCount));
      router.push("/visaapplicationform");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const visaPriorities = {
      visa_free: 1,
      e_visa: 2,
      traditional: 3,
      null: Infinity,
    };

    const getHighestPriorityVisaType = (residentType, citizenshipType) => {
      const residentPriority = visaPriorities[residentType] || visaPriorities.null;
      const citizenshipPriority = visaPriorities[citizenshipType] || visaPriorities.null;

      if (residentPriority < citizenshipPriority) {
        return residentType;
      } else if (citizenshipPriority < residentPriority) {
        return citizenshipType;
      } else {
        return residentType || citizenshipType;
      }
    };

    const checkCountryType = async () => {
      try {
        // Check in citizenship country API
        try {
          const citizenshipResponse = await getCitizenshipData(authState.user.citizenship_country);
          if (citizenshipResponse.data) {
            if (citizenshipResponse.data.traditional_visas.some((item) => item.destination_country === name)) {
              setCitizenshipVisaType("traditional");
            } else if (citizenshipResponse.data.evisas.some((item) => item.destination_country === name)) {
              setCitizenshipVisaType("e_visa");
            } else if (citizenshipResponse.data.visa_free.some((item) => item.destination_country === name)) {
              setCitizenshipVisaType("visa_free");
            }
          }
        } catch (error) {
          if (error.response && error.response.status !== 404) {
            console.error("Error checking citizenship data:", error);
          }
        }

        // Check in resident country API
        try {
          const residentResponse = await getResidentData(authState.user.resident_country);
          if (residentResponse.data) {
            if (residentResponse.data.traditional_visas.some((item) => item.destination_country === name)) {
              setResidentVisaType("traditional");
            } else if (residentResponse.data.evisas.some((item) => item.destination_country === name)) {
              setResidentVisaType("e_visa");
            } else if (residentResponse.data.visa_free.some((item) => item.destination_country === name)) {
              setResidentVisaType("visa_free");
            }
          }
        } catch (error) {
          if (error.response && error.response.status !== 404) {
            console.error("Error checking resident data:", error);
          }
        }

        // Determine the highest priority visa type
        const highestPriority = getHighestPriorityVisaType(residentVisaType, citizenshipVisaType);
        setHighestPriorityVisaType(highestPriority);

      } catch (error) {
        console.error("General error checking country data:", error);
      }
    };

    checkCountryType();
  }, [name, residentVisaType, citizenshipVisaType]);

  return (
    <div className={styles.applyNowContainer}>
      <div className={styles.applyNowCard}>
        {active && highestPriorityVisaType === visa_type && (
          <>
            <h2>{cardHeading}</h2>
            <div className={styles.applicantFormGroup}>
              <div className={styles.inputGroup}>
                <img src="/assets/user.png" alt="User icon" />
                <label>No of Applicant</label>
              </div>
              <div className={styles.inputGroup}>
                <FiMinusCircle onClick={handleDecrement} className={styles.counterIcon} />
                <p className={styles.applicantCount}>{applicantCount}</p>
                <FiPlusCircle onClick={handleIncrement} className={styles.counterIcon} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Price</label>
              <div className={styles.priceDetails}>
                <span>
                  <img src="/assets/visaIcon.png" alt="Visa icon" /> <p> Visa Fees</p>
                </span>
                <span>${parseFloat(visaFees)} x {applicantCount}</span>
              </div>
            </div>
            <div className={styles.totalAmount} style={isPayment ? { marginBottom: 0 } : {}}>
              <span>Total Amount</span>
              <span>$ {parseFloat(totalAmount)}</span>
            </div>
          </>
        )}
        {active && highestPriorityVisaType === visa_type ? (
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
          <button
            className={`${styles.wishlistButton} ${isDisabled ? styles.disabled : ''}`}
            disabled={isDisabled}
            onClick={handleWishlist}
          >
            Add to Wishlist
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
