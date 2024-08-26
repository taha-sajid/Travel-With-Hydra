import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import styles from "./Payment.module.css";
import stylesP from "../PaymentCard/PaymentCard.module.css";

import { useAuthToken } from "@/api/customHooks";
import { API_BASE_URL } from "@/api/config";
import { useSelector } from "react-redux";


// Initialize Stripe
const stripePromise = loadStripe("pk_test_51LhnXOCFr7YV6lJdn0mC7Yv71iGkqw0hXgzM2NqVMSGFfZBMvHh1fSO9F1WEsy8OQvucQQYFfraR1q1MwtTzMvxm00w9puB5ee");

const PaymentForm = () => {
  const token = useAuthToken();
  const stripe = useStripe();
  const elements = useElements();
  const [cardHolderName, setCardHolderName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const applicantsPrice = useSelector((state) => state.visa.totalPrice);
  const formUUID = useSelector((state) => state.visa.generateUUID);
  // Async function to fetch payment intent
  const createPaymentIntent = async (price, uuid) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/visa/create-payment-intent/`,
        {
          price,  // Pass price to the backend
          uuid,   // UUID for the payment intent
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Use token for authorization
            "Content-Type": "application/json"
          }
        }
      );

      const { client_secret } = response.data;
      if (client_secret) {
        return client_secret;
      } else {
        throw new Error("Client secret not returned from backend");
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    try {
      const price = applicantsPrice;
      const uuid = formUUID;
      const client_secret = await createPaymentIntent(price, uuid);

      // Get the CardElement from Stripe.js
      const cardElement = elements.getElement(CardElement);

      // Confirm the payment using the client_secret
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardHolderName,
          },
        },
      });

      setIsLoading(false);

      if (error) {
        console.error("Payment error:", error);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
      }
    } catch (error) {
      console.error("Error in payment processing:", error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.accordionItemDescription}>
      <div className={styles.formGroup}>
        <label htmlFor="cardHolderName">Card holder name</label>
        <input
          type="text"
          id="cardHolderName"
          placeholder="Ex. Jane Cooper"
          value={cardHolderName}
          onChange={(e) => setCardHolderName(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Card Details</label>
        <CardElement className={styles.cardElement} />
      </div>
      <button type="submit" disabled={!stripe || isLoading} className={styles.payNowButton}>
        {isLoading ? "Processing..." : "PAY NOW"}
      </button>
    </form>
  );
};

const Payment = ({ token }) => {
  const applicantsPrice = useSelector((state) => state.visa.totalPrice);
  const applicantsCount = useSelector((state) => state.visa.applicantsCount);


  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className={styles.paymentContainer}>
      <div className={styles.paymentDetailsContainer}>
        <h2>Payment Details</h2>
        <div className={styles.accordion}>
          <div className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}>
            <div className={styles.accordionItemHeader} onClick={toggleAccordion}>
              <span className={styles.accordionItemHeaderTitle}>Payment</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${styles.lucide} ${styles.accordionItemHeaderIcon}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <div className={styles.accordionItemDescriptionWrapper}>
              <PaymentForm token={token} />
            </div>
          </div>
        </div>
      </div>
      <div style={{width:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                  }}>
        <div className={stylesP.applyNowContainer}>
          <div className={stylesP.applyNowCard}>
              <h2>Cart</h2>
              <div className={stylesP.applicantFormGroup}>
                <div className={stylesP.inputGroup}>
                  <img src="/assets/user.png" alt="User icon" />
                  <label>No of Applicant</label>
                </div>
                  <span>{applicantsCount}</span>
              </div>
              <div className={stylesP.formGroup}>
                <div className={stylesP.priceDetails}>
                  <span>
                    <img src="/assets/visaIcon.png" alt="Visa icon" /> <p> Visa Fees</p>
                  </span>
                </div>
              </div>
              <div className={stylesP.totalAmount}>
                <span>Total Amount</span>
                <span>$ {parseFloat(applicantsPrice)}</span>
              </div>

            </div>  
        </div>
      </div>
    </main>
  );
};

export default function PaymentPage({ token }) {
  return (
    <Elements stripe={stripePromise}>
      <Payment token={token} />
    </Elements>
  );
}
