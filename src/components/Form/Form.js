import React from "react";
import styles from "./Form.module.css";
const Form = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.leftContainer}>
        <img src="/assets/formPageImage.png" />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.login}>
          <h2 className={styles.loginTitle}>Login</h2>
          <p className={styles.loginSubtitle}>
            Welcome back! Log in to your account.
          </p>
          <form className={styles.loginForm}>
            <div className={styles.loginField}>
              <label htmlFor="email" className={styles.loginLabel}>
                Email Address
              </label>
              <div className={styles.loginInputWrapper}>
                <div className={styles.inputFieldIcon}>
                  <img
                    src="/email-icon.png"
                    alt="Email Icon"
                    className={styles.loginIcon}
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  className={styles.loginInput}
                  placeholder="admin@domain.com"
                  required
                />
              </div>
            </div>
            <div className={styles.loginField}>
              <label htmlFor="password" className={styles.loginLabel}>
                Password
              </label>
              <div className={styles.loginInputWrapper}>
                <div className={styles.inputFieldIcon}>
                  <img
                    src="/password-icon.png"
                    alt="Password Icon"
                    className={styles.loginIcon}
                  />
                </div>
                <input
                  type="password"
                  id="password"
                  className={styles.loginInput}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className={styles.loginOptions}>
              <label className={styles.loginRemember}>
                <input type="checkbox" className={styles.loginCheckbox} />
                Remember Password
              </label>
              <a href="#" className={styles.loginForgot}>
                Forgot Password?
              </a>
            </div>
            <button type="submit" className={styles.loginButton}>
              Sign In
            </button>
          </form>
          <p className={styles.loginSignUp}>
            Didn't have an account? 
            <a href="#" className={styles.loginSignUpLink}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
