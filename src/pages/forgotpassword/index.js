import Form from "@/components/Form/Form";
import React from "react";

const index = () => {
  const formData = {
    formTitle: "Reset your Password",
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
    <div>
      <Form {...formData} />
    </div>
  );
};

export default index;
