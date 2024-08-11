import React, { useEffect, useState } from "react";
import styles from "./Accordion.module.css";

const Accordion = ({ faqs }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (faqs && faqs.length > 0) {
      setData(faqs[0]?.faqs || []);
    }
  }, [faqs]);

  // Setup accordion item toggle functionality
  useEffect(() => {
    const accordionItems = document.querySelectorAll(
      `.${styles.accordionItem}`
    );

    const toggleOpen = (item) => () => {
      item.classList.toggle(styles.open);
    };

    accordionItems.forEach((item) => {
      const header = item.querySelector(`.${styles.accordionItemHeader}`);
      header.addEventListener("click", toggleOpen(item));
    });

    // Cleanup event listeners on component unmount
    return () => {
      accordionItems.forEach((item) => {
        const header = item.querySelector(`.${styles.accordionItemHeader}`);
        header.removeEventListener("click", toggleOpen(item));
      });
    };
  }, [data]);

  return (
    <main className={styles.accordionContainer}>
      <div className={styles.accordion}>
        {data.map((item) => (
          <div key={item.id} className={styles.accordionItem}>
            <div className={styles.accordionItemHeader}>
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
            <div className={styles.accordionItemDescriptionWrapper}>
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
