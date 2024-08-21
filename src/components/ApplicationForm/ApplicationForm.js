import React, { useState } from "react";
import styles from "./ApplicationForm.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { submitVisaApplication } from "@/store/slices/authSlice";
import { getVisaApplications } from "@/api/visa";

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const dispatch = useDispatch();
  const currentCountryForms = useSelector(
    (state) => state.auth.currentCountryForms
  );

  const authState = useSelector((state) => state.auth);
  console.log("authState", authState);

  const totalSteps = currentCountryForms.length + 1; // Add 1 for the final step
  const [formData, setFormData] = useState({});

  const handleNextClick = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleInputChange = (fieldLabel, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldLabel]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    try {
      const result = await dispatch(
        submitVisaApplication(JSON.stringify(formData))
      ).unwrap();
      console.log("Visa application submitted successfully:", result);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const completedSteps = Math.floor((currentStep / totalSteps) * 100);

  return (
    <div className={styles.applicationFormContainer}>
      <div className={styles.visaApplicationFormContainer}>
        <div className={styles.visaApplicationForm}>
          <h1
            className={`${
              currentStep === totalSteps && styles.applicationFormDoneHeading
            }`}
          >
            Visa Application Form
          </h1>

          {currentStep !== totalSteps && (
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar}>
                {Array.from({ length: totalSteps - 1 }, (_, index) => (
                  <div
                    key={index}
                    className={`${styles.progressStep} ${
                      currentStep >= index + 1 ? styles.progressStepActive : ""
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.animatedProgressBar}>
            <p className={styles.stepIndicator}>
              {currentStep}/{totalSteps}
            </p>
            <div
              className={styles.active}
              style={{ width: `${completedSteps}%` }}
            >
              <img src="/assets/planeIcon.png" alt="Plane Icon" />
              <p className={styles.completedPercentage}>
                {Math.floor((currentStep / totalSteps) * 100)}%
              </p>
            </div>
          </div>

          {currentStep <= currentCountryForms.length && (
            <>
              <p>{currentCountryForms[currentStep - 1]?.field_label}</p>

              {currentCountryForms[currentStep - 1].field_type === "text" && (
                <input
                  type="text"
                  placeholder="Answer..."
                  value={
                    formData[
                      currentCountryForms[currentStep - 1].field_label
                    ] || ""
                  }
                  onChange={(e) =>
                    handleInputChange(
                      currentCountryForms[currentStep - 1].field_label,
                      e.target.value
                    )
                  }
                />
              )}

              {currentCountryForms[currentStep - 1].field_type ===
                "textarea" && (
                <textarea
                  placeholder="Answer..."
                  value={
                    formData[
                      currentCountryForms[currentStep - 1].field_label
                    ] || ""
                  }
                  onChange={(e) =>
                    handleInputChange(
                      currentCountryForms[currentStep - 1].field_label,
                      e.target.value
                    )
                  }
                ></textarea>
              )}

              {currentCountryForms[currentStep - 1].field_type === "upload" && (
                <label className={styles.uploadContainer} htmlFor="personImage">
                  <img src="/assets/uploadIcon.png" className={styles.icon} />
                  <span className={styles.uploadLabel}>
                    Upload or drag file here
                  </span>
                  <input
                    type="file"
                    id="personImage"
                    className={styles.uploadInput}
                    onChange={(e) =>
                      handleInputChange(
                        currentCountryForms[currentStep - 1].field_label,
                        e.target.files[0]
                      )
                    }
                  />
                </label>
              )}

              {currentCountryForms[currentStep - 1].field_type === "date" && (
                <input
                  type="date"
                  value={
                    formData[
                      currentCountryForms[currentStep - 1].field_label
                    ] || ""
                  }
                  onChange={(e) =>
                    handleInputChange(
                      currentCountryForms[currentStep - 1].field_label,
                      e.target.value
                    )
                  }
                />
              )}

              {currentCountryForms[currentStep - 1].field_type === "number" && (
                <input
                  type="number"
                  placeholder="Enter a number..."
                  value={
                    formData[
                      currentCountryForms[currentStep - 1].field_label
                    ] || ""
                  }
                  onChange={(e) =>
                    handleInputChange(
                      currentCountryForms[currentStep - 1].field_label,
                      e.target.value
                    )
                  }
                />
              )}
            </>
          )}

          {currentStep === totalSteps && (
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
              currentStep === totalSteps ? styles.btnContainerDone : ""
            }`}
          >
            <button onClick={handlePreviousClick}>Previous</button>
            {currentStep < totalSteps ? (
              <button onClick={handleNextClick}>Next</button>
            ) : (
              <button onClick={handleSubmit}>Submit</button>
            )}
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
