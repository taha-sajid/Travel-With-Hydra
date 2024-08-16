import React, { useState } from "react";
import styles from "./Accordion.module.css";

const Accordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <main className={styles.accordionContainer}>
      <div className={styles.accordion}>
        {faqs.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.accordionItem} ${
              openIndex === index ? styles.open : ""
            }`}
          >
            <div
              className={styles.accordionItemHeader}
              onClick={() => toggleOpen(index)}
            >
              <span className={styles.accordionItemHeaderTitle}>
                {item.question}
              </span>
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
                className={styles.accordionItemHeaderIcon}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <div
              className={`${styles.accordionItemDescriptionWrapper} ${
                openIndex === index ? styles.open : ""
              }`}
            >
              <div className={styles.accordionItemDescription}>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Accordion;
