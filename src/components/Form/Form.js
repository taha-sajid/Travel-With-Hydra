import React from "react";
import styles from "./Form.module.css";
import { FiMail } from "react-icons/fi";
import { LuEyeOff } from "react-icons/lu";
import { LuPhone } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import Link from "next/link";

const iconComponents = {
  FiMail: FiMail,
  LuEyeOff: LuEyeOff,
  LuPhone: LuPhone,
  TfiWorld: TfiWorld,
  GrMapLocation: GrMapLocation,
};

const Form = ({ formTitle, formSubtitle, fields, options }) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.leftContainer}>
        <img src="/assets/formPageImage.png" alt="Form Page" />
      </div>
      <div className={styles.rightContainer}>
        <img src="/assets/logo.png" className={styles.formLogo} />
        <div className={styles.login}>
          <h2 className={styles.loginTitle}>{formTitle}</h2>
          <p className={styles.loginSubtitle}>{formSubtitle}</p>
          <form className={styles.loginForm}>
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
            <Link href={options.submitBtnLink} className={styles.loginButton}>
              <button type="submit">{options.submitText}</button>
            </Link>
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
