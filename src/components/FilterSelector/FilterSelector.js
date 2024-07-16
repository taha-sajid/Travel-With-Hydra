import React from "react";
import styles from "./FilterSelector.module.css";

const Filter = () => {
  return (
    <div className={styles.dropdown}>
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
                role="option"
              >
                Option 1
              </li>
              <li className={styles.dropdownSelectOption} role="option">
                Option 2
              </li>
              <li className={styles.dropdownSelectOption} role="option">
                Option 3
              </li>
              <li className={styles.dropdownSelectOption} role="option">
                Option 4
              </li>
              <li className={styles.dropdownSelectOption} role="option">
                Option 5
              </li>
            </ul>
          </li>
        </ul>
      </label>
    </div>
  );
};

export default Filter;
