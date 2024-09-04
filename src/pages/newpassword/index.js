import Form from "@/components/Form/Form";
import Header from "@/components/Header/header";
import React from "react";
import styles from "./newpassword.module.css";

const index = () => {
  const formData = {
    formTitle: "Reset Password",
    formType: "newpassword",
    fields: [
      {
        id: "new_password1",
        type: "password",
        label: "New Password",
        placeholder: "Password",
        required: true,
        icon: "LuEyeOff",
      },
      {
        id: "new_password2",
        type: "password",
        label: "Confirm Password",
        placeholder: "Password",
        required: true,
        icon: "LuEyeOff",
      },
    ],
    options: {
      submitText: "Submit",
      submitBtnLink: "/login",
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
