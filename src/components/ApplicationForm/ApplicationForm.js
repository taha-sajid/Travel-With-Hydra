import React, { useState, useEffect } from "react";
import styles from "./ApplicationForm.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { submitVisaApplication } from "@/store/slices/authSlice";
import { useRouter } from "next/router";

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentCountryFormsLength, setCurrentCountryFormsLength] = useState(0);
  const [numberOfApplicants, setNumberOfApplicants] = useState(2);
  const [currentForm, setCurrentForm] = useState(1);
  const [allFormsData, setAllFormsData] = useState([]);

  const applicantsCount = useSelector((state) => state.visa.applicantsCount);
  useEffect(() => {
    setNumberOfApplicants(applicantsCount);
  }, []);
  console.log("number of applicants count", applicantsCount);

  const router = useRouter();

  const dispatch = useDispatch();
  const currentCountryForms = useSelector(
    (state) => state.auth.currentCountryForms
  );

  const token = useSelector((state) => state.auth.token);
  const countryName = useSelector((state) => state.visa.country_name);
  const visaType = useSelector((state) => state.visa.visa_type);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (currentCountryForms && currentCountryForms.length > 0) {
      setCurrentCountryFormsLength(currentCountryForms.length);
    }
  }, [currentCountryForms]);

  const handleNextClick = () => {
    console.log("clicked");

    if (currentStep < currentCountryFormsLength) {
      setCurrentStep((prevStep) => prevStep + 1);
      console.log("logged");
    } else if (currentForm !== numberOfApplicants) {
      setAllFormsData((prevData) => [...prevData, formData]);
      setFormData({});
      setCurrentStep(1);
      setCurrentForm((prev) => prev + 1);
    } else {
      setAllFormsData((prevData) => [...prevData, formData]);
      setFormData({});
      setCurrentForm(numberOfApplicants + 1);
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


    for (const formData of allFormsData) {
      const responses = {};
      const files = {};

      for (const [key, value] of Object.entries(formData)) {
        if (value instanceof File) {
          const base64File = await convertFileToBase64(value);
          files[key] = base64File;
        } else {
          responses[key] = value;
        }
      }

      const payload = {
        country_name: countryName,
        user: 4,
        visa_type: visaType,
        responses: responses,
        files: files,
      };

      console.log("Submitting form with data:", payload);

      try {
        const result = await dispatch(
          submitVisaApplication({ visaFormInfo: payload, token })
        ).unwrap();
        console.log("Visa application submitted successfully:", result);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    router.push("/payment");
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const completedSteps = Math.floor(
    (currentStep / (currentCountryFormsLength + 1)) * 100
  );

  return (
    <div className={styles.applicationFormContainer}>
      <div className={styles.visaApplicationFormContainer}>
        <div className={styles.visaApplicationForm}>
          <h1
            className={`${
              currentStep === currentCountryFormsLength + 1 &&
              styles.applicationFormDoneHeading
            }`}
          >
            Visa Application Form
          </h1>

          {currentForm !== numberOfApplicants + 1 && (
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar}>
                {Array.from({ length: numberOfApplicants }, (_, index) => (
                  <div
                    key={index}
                    className={`${styles.progressStep} ${
                      currentForm >= index + 1 ? styles.progressStepActive : ""
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.animatedProgressBar}>
            <p className={styles.stepIndicator}>
              {currentStep}/{currentCountryFormsLength + 1}
            </p>
            <div
              className={styles.active}
              style={{ width: `${completedSteps}%` }}
            >
              <img src="/assets/planeIcon.png" alt="Plane Icon" />
              <p className={styles.completedPercentage}>{completedSteps}%</p>
            </div>
          </div>

          {currentStep <= currentCountryFormsLength && (
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

          {currentForm === numberOfApplicants + 1 && (
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
              currentStep === currentCountryFormsLength + 1
                ? styles.btnContainerDone
                : ""
            }`}
          >
            <button onClick={handlePreviousClick}>Previous</button>
            {currentStep < currentCountryFormsLength + 1 ? (
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
