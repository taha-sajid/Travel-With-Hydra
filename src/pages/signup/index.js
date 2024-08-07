import Form from "@/components/Form/Form";
import Header from "@/components/Header/header";
import React from "react";
import styles from "./signup.module.css";

const index = () => {
  const formData = {
    formType: "signup",
    formTitle: "Sign Up",
    formSubtitle: "Welcome back! Log in to your account.",
    fields: [
      {
        id: "full_name",
        type: "text",
        label: "Full name",
        placeholder: "full name",
        required: true,
        icon: "FiMail",
      },

      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "admin@domain.com",
        required: true,
        icon: "FiMail",
      },
      {
        id: "mobile_number",
        type: "text",
        label: "Mobile Number",
        placeholder: "+16 1111 111 111",
        required: true,
        icon: "LuPhone",
      },
      {
        id: "password1",
        type: "password",
        label: "Password",
        placeholder: "Password",
        required: true,
        icon: "LuEyeOff",
      },

      {
        id: "citizenship_country",
        type: "text",
        label: "Citizenship",
        placeholder: "Citizenship",
        required: true,
        icon: "TfiWorld",
      },
      {
        id: "resident_country",
        type: "text",
        label: "Country of Residency",
        placeholder: "Residency",
        required: true,
        icon: "GrMapLocation",
      },
    ],
    options: {
      forgotLink: "/newpassword",
      submitText: "SIGN UP",
      submitBtnLink: "/dashboard",
      signUpText: "Already have an account?",
      signUpLinkText: "Login",
      signUpLink: "/login",
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
