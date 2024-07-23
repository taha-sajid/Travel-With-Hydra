import React, { useState } from "react";
import styles from "./ApplicationForm.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";
import { BiCloudUpload, BiCloudDownload } from "react-icons/bi";

const ApplicationForm = () => {
  // Step state
  const [currentStep, setCurrentStep] = useState(1);

  // Function to handle next button click
  const handleNextClick = () => {
    if (currentStep < 4) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  // Function to handle previous button click (if needed)
  const handlePreviousClick = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <div className={styles.applicationFormContainer}>
      <div className={styles.visaApplicationFormContainer}>
        <div className={styles.visaApplicationForm}>
          <h1
            className={`${
              currentStep === 4 && styles.applicationFormDoneHeading
            }`}
          >
            Visa Application Form
          </h1>
          {currentStep !== 4 && (
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar}>
                <div
                  className={`${styles.progressStep} ${
                    currentStep >= 1 ? styles.progressStepActive : ""
                  }`}
                ></div>
                <div
                  className={`${styles.progressStep} ${
                    currentStep >= 2 ? styles.progressStepActive : ""
                  }`}
                ></div>
                <div
                  className={`${styles.progressStep} ${
                    currentStep >= 3 ? styles.progressStepActive : ""
                  }`}
                ></div>
              </div>
            </div>
          )}
          <div className={styles.animatedProgressBar}>
            <p className={styles.stepIndicator}>{currentStep}/4</p>
            <div className={styles[`active${currentStep}`]}>
              <img src="/assets/planeIcon.png" alt="Plane Icon" />
              <p className={styles.completedPercentage}>{currentStep * 25}%</p>
            </div>
          </div>
          {currentStep !== 4 && (
            <p>Lorem ipsum dolor sit amet consectetur. Tincidunt sem?</p>
          )}
          {currentStep === 1 && <textarea placeholder="Answer..."></textarea>}
          {currentStep === 2 && <textarea placeholder="Answer..."></textarea>}

          {/* {currentStep === 1 ||
            currentStep === 2()} */}
          {currentStep === 3 && (
            <label className={styles.uploadContainer} htmlFor="personImage">
              <img src="/assets/uploadIcon.png" className={styles.icon} />
              <span className={styles.uploadLabel}>
                Upload or drag file here
              </span>
              <input
                type="file"
                id="personImage"
                className={styles.uploadInput}
              />
            </label>
          )}
          {currentStep === 4 && (
            <>
              <img src="/assets/done.gif" className={styles.doneIcon} />

              <div className={styles.greetingsContainer}>
                <h2>Congratulations!</h2>
                <p>
                  You've completed your visa application form. Please proceed to
                  payment to submit your application.
                </p>
              </div>
            </>
          )}
          <div
            className={`${styles.btnContainer} ${
              currentStep === 4 ? styles.btnContainerDone : ""
            }`}
          >
            <button onClick={handlePreviousClick}>Previous</button>
            <button onClick={handleNextClick}>Next</button>
          </div>
          <Link href={"/"}>
            <div className={`${styles.exitBtnContainer}`}>
              <span className={styles.icon}>
                <IoIosCloseCircle />
              </span>
              <p>Exit</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
