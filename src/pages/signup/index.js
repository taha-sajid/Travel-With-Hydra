import Form from "@/components/Form/Form";
import Header from "@/components/Header/header";
import React from "react";

const index = () => {
  const formData = {
    formTitle: "Sign Up",
    formSubtitle: "Welcome back! Log in to your account.",
    fields: [
      {
        id: "fullName",
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
        id: "mobileNumber",
        type: "number",
        label: "Mobile Number",
        placeholder: "+16 1111 111 111",
        required: true,
        icon: "LuPhone",
      },
      {
        id: "password",
        type: "password",
        label: "Password",
        placeholder: "Password",
        required: true,
        icon: "LuEyeOff",
      },
      {
        id: "Citizenship",
        type: "text",
        label: "Citizenship",
        placeholder: "Citizenship",
        required: true,
        icon: "TfiWorld",
      },
      {
        id: "Residency",
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
    <div>
      <Header />
      <Form {...formData} />
    </div>
  );
};

export default index;
