import React, { useState } from "react";
import styles from "./Form.module.css";

import { useDispatch, useSelector } from "react-redux";
import { login, register, changePassword, forgotPassword, resetPassword, logout } from "@/store/slices/authSlice";

import { FiMail } from "react-icons/fi";
import { LuEyeOff } from "react-icons/lu";
import { LuPhone } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { useAuthToken } from "@/api/customHooks";

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
  const AuthToken = useAuthToken();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  
  const router = useRouter();
  const { uid, token } = router.query
  console.log("formType", uid);
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
        await dispatch(login(formData)).unwrap();
        const redirect = router.query.redirect || "/dashboard";
        router.push(redirect);
      } else if (formType === "signup") {
        console.log("signup formValues", formData);
        await dispatch(register(formData)).unwrap();
      }
      else if (formType === "newpassword") {
        if(token){
          await dispatch(resetPassword({passwords: formData, token, uid})).unwrap();
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        }
        else if (AuthToken){
          await dispatch(changePassword({passwords: formData, AuthToken})).unwrap();
          dispatch(logout());
          await router.push("/");
        }
        else{
          extractErrorMessages("Somehting went wrong, please try later");
        }
      }
      else if (formType === "forgotpassword") {
        await dispatch(forgotPassword(formData)).unwrap();
        extractErrorMessages("Password reset e-mail has been sent to your email.");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
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

  console.log("resetTtoken=========", token);

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
                      {IconComponent && <IconComponent className={styles.loginIcon} />}
                    </div>
                    
                    {field.type === "select" ? (
                      <select
                        id={field.id}
                        className={styles.loginSelect}
                        required={field.required}
                        value={formValues[field.id]}
                        onChange={handleInputChange}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={field.id}
                        className={styles.loginInput}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formValues[field.id]}
                        onChange={handleInputChange}
                      />
                    )}
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
