import Form from "@/components/Form/Form";
import Header from "@/components/Header/header";
import React, { useEffect } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const index = () => {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  const isLoggedIn = authState.status === "succeeded" && authState.user !== null;


  useEffect(() => {
    // Redirect to login page if not logged in
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);
  const formData = {
    formType: "login",
    formTitle: "Log In",
    formSubtitle: "",
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
      submitText: "LOG IN",
      submitBtnLink: "/dashboard",
      signUpText: "Don't have an account?",
      signUpLinkText: "Sign Up",
      signUpLink: "/signup",
    },
  };
  return (
    <div className={styles.loginContainer}>
      <div>
        <Header />
      </div>
      {!isLoggedIn && (
        <div className={styles.form}>
        <Form {...formData} />
      </div>
      )}
    </div>
  );
};

export default index;
