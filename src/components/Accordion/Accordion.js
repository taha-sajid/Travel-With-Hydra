import React, { useEffect, useState } from "react";
import styles from "./Accordion.module.css";

const Accordion = () => {
  const [data, setData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

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
  }, [data]); // Run this effect when data changes

  return (
    <main className={styles.accordionContainer}>
      <div className={styles.accordion}>
        {data.map((item) => (
          <div key={item.id} className={styles.accordionItem}>
            <div className={styles.accordionItemHeader}>
              <span className={styles.accordionItemHeaderTitle}>
                {item.title}
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
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Accordion;
