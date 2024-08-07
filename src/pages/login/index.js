import Form from "@/components/Form/Form";
import Header from "@/components/Header/header";
import React from "react";
import styles from "./login.module.css";

const index = () => {
  const formData = {
    formType: "login",
    formTitle: "Login",
    formSubtitle: "Welcome back! Log in to your account.",
    fields: [
      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "admin@domain.com",
        required: true,
        icon: "FiMail",
      },
    
      {
        id: "password",
        type: "password",
        label: "Password",
        placeholder: "Password",
        required: true,
        icon: "LuEyeOff",
      },
    ],
    options: {
      rememberText: "Remember Password",
      forgotText: "Forgot Password?",
      forgotLink: "/forgotpassword",
      submitText: "SIGN IN",
      submitBtnLink: "/dashboard",
      signUpText: "Didn't have an account?",
      signUpLinkText: "Sign Up",
      signUpLink: "/signup",
    },
  };
  return (
    <div className={styles.loginContainer}>
      <div>
        <Header />
      </div>
      <div className={styles.form}>
        <Form {...formData} />
      </div>
    </div>
  );
};

export default index;
