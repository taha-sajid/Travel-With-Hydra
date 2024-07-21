import Form from "@/components/Form/Form";
import React from "react";

const index = () => {
  const formData = {
    formTitle: "New Password",
    fields: [
      {
        id: "NewPassword",
        type: "password",
        label: "New Password",
        placeholder: "Password",
        required: true,
        icon: "LuEyeOff",
      },
      {
        id: "Confirm Password",
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
    <div>
      <Form {...formData} />
    </div>
  );
};

export default index;
