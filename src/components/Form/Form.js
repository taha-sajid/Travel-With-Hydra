import React, { useState } from "react";
import styles from "./Form.module.css";

import { useDispatch, useSelector } from "react-redux";
import { login, register } from "@/store/slices/authSlice";

import { FiMail } from "react-icons/fi";
import { LuEyeOff } from "react-icons/lu";
import { LuPhone } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";

import Link from "next/link";
import { useRouter } from "next/router";

const iconComponents = {
  FiMail: FiMail,
  LuEyeOff: LuEyeOff,
  LuPhone: LuPhone,
  TfiWorld: TfiWorld,
  GrMapLocation: GrMapLocation,
};

const Form = ({ formType, formTitle, formSubtitle, fields, options }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);


  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const router = useRouter();

  const [formValues, setFormValues] = useState(() => {
    const initialValues = {};
    fields.forEach((field) => {
      initialValues[field.id] = "";
    });
    return initialValues;
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);
    const formData = { ...formValues };

    if (formType === "signup") {
      formData.password2 = formValues.password1;
      formData.username = formValues.email;
    }
    if (formType === "login") {
      formData.username = formValues.email;
    }

    try {
      if (formType === "login") {
        console.log("login formValues", formData);
        await dispatch(login(formData)).unwrap();
        router.push("/dashboard");
      } else if (formType === "signup") {
        console.log("signup formValues", formData);
        await dispatch(register(formData)).unwrap();
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      extractErrorMessages(error);
    } finally {
      setIsLoading(false);
    }
  };

  const extractErrorMessages = (errors) => {
    const messages = [];
    Object.keys(errors).forEach((key) => {
      messages.push(...errors[key]);
    });
    setIsError(messages);
  };

  console.log("authState", authState);

  return (
    <div className={styles.formContainer}>
      <div className={styles.leftContainer}>
        <img src="/assets/formPageImage.png" alt="Form Page" />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.login}>
          <h2 className={styles.loginTitle}>{formTitle}</h2>
          <p className={styles.loginSubtitle}>{formSubtitle}</p>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            {fields.map((field) => {
              const IconComponent = iconComponents[field.icon];
              return (
                <div
                  className={`${styles.loginField} ${
                    formTitle === "Sign Up" && styles.signUpField
                  }`}
                  key={field.id}
                >
                  <label htmlFor={field.id} className={styles.loginLabel}>
                    {field.label}
                  </label>
                  <div className={styles.loginInputWrapper}>
                    <div className={styles.inputFieldIcon}>
                      {IconComponent && (
                        <IconComponent className={styles.loginIcon} />
                      )}
                    </div>
                    <input
                      type={field.type}
                      id={field.id}
                      className={styles.loginInput}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formValues[field.id]}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              );
            })}
            <div className={styles.loginOptions}>
              <label className={styles.loginRemember}>
                {options.rememberText && (
                  <input type="checkbox" className={styles.loginCheckbox} />
                )}
                {options.rememberText}
              </label>
              <a href={options.forgotLink} className={styles.loginForgot}>
                {options.forgotText}
              </a>
            </div>
            {/* <Link href={options.submitBtnLink} className={styles.loginButton}> */}
            {isError && <p className={styles.error}>{isError}</p>}
            <button type="submit" className={styles.loginButton}>
              {isLoading && <div className="loader"></div>} {options.submitText}
            </button>
            {/* </Link> */}
          </form>
          <p
            className={`${styles.loginSignUp} ${
              formTitle === "Sign Up" && styles.loginSignUpText
            }`}
          >
            {options.signUpText}
            {options.signUpLinkText && (
              <Link
                href={options.signUpLink}
                className={styles.loginSignUpLink}
              >
                {options.signUpLinkText}
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Form;
