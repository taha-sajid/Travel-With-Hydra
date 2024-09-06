import Form from "@/components/Form/Form";
import Header from "@/components/Header/header";
import React from "react";
import styles from "./forgotpassword.module.css";

const index = () => {
  const formData = {
    formTitle: "Reset your Password",
    formType: "forgotpassword",
    fields: [
      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "admin@domain.com",
        required: true,
        icon: "FiMail",
      },
    ],
    options: {
      submitText: "SEND EMAIL",
      submitBtnLink: "/newpassword",
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
