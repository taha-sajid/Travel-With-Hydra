import React from "react";
import styles from "./FilterSelector.module.css";

const Filter = () => {
  return (
    <div className={styles.dropdown}>
      {/* Filter by: */}
      <input
        type="checkbox"
        className={styles.dropdownSwitch}
        id="filter-switch"
        hidden
      />
      <label htmlFor="filter-switch" className={styles.dropdownOptionsFilter}>
        <ul className={styles.dropdownFilter} role="listbox" tabIndex="-1">
          <li className={styles.dropdownFilterSelected} aria-selected="true">
            Country
          </li>
          <li>
            <ul className={styles.dropdownSelect}>
              <li
                className={`${styles.dropdownSelectOption} ${styles.active}`}
                role="United Kingdom"
              >
                United Kingdom
              </li>
              <li className={styles.dropdownSelectOption} role="Portugal">
                Portugal
              </li>
              <li className={styles.dropdownSelectOption} role="Denmark">
                Denmark
              </li>
              <li className={styles.dropdownSelectOption} role="Morocco">
                Morocco
              </li>
              <li className={styles.dropdownSelectOption} role="Australia">
                Australia
              </li>
              <li className={styles.dropdownSelectOption} role="Scotland">
                Scotland
              </li>
            </ul>
          </li>
        </ul>
      </label>
    </div>
  );
};

export default Filter;
