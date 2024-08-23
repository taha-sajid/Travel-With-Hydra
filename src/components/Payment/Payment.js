import { useState } from "react";
import styles from "./Payment.module.css";
import PaymentCard from "../PaymentCard/PaymentCard";

const cardData = {
  cardHeading: "Cart",
  isButton: false,
};

const Payment = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className={styles.paymentContainer}>
      <div className={styles.paymentDetailsContainer}>
        <h2>Payment Details</h2>
        <div className={styles.accordion}>
          <div
            className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}
          >
            <div
              className={styles.accordionItemHeader}
              onClick={toggleAccordion}
            >
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
              <div className={styles.accordionItemDescription}>
                <form>
                  <div className={styles.formGroup}>
                    <label htmlFor="cardHolderName">Card holder name</label>
                    <input
                      type="text"
                      id="cardHolderName"
                      placeholder="Ex. Jane Cooper"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="8432 6568 55478"
                    />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="expireDate">Expire</label>
                      <input type="text" id="expireDate" placeholder="06/25" />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="cvv">CVV</label>
                      <input type="password" id="cvv" placeholder="***" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className={styles.payNowButton}>
          PAY NOW
        </button>
      </div>
    </main>
  );
};

export default Payment;
