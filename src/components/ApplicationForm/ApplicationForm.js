import React from "react";
import styles from "./ApplicationForm.module.css";
const ApplicationForm = () => {
  return (
    <div className={styles.applicationFormContainer}>
      <div className={styles.visaApplicationFormContainer}>
        <h1>Application Form</h1>
        <img src="/assets/glassCard.png" />
      </div>
    </div>
  );
};

export default ApplicationForm;
