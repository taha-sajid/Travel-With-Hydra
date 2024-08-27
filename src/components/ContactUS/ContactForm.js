import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";
import { contactUs } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { contactUsAPI } from "@/api/cms";
import { useState } from "react";

const ContactForm = () => {
  const [submissionMessage, setSubmissionMessage] = useState("")
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("This field is required"),
      last_name: Yup.string().required("This field is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      phone: Yup.string().required("This field is required"),
      message: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("values", values);
        const response = await contactUsAPI(values);
        console.log("Form values:", response);
        formik.resetForm()
        setSubmissionMessage("Thank you for your message! We will get back to you shortly.");
      } catch (error) {
        if (error.response && error.response.data) {
          console.error("Backend error:", error.response.data);
          extractErrorMessages(error.response.data);
        } else {
          console.error("An error occurred:", error);
        }
      }
    },
  });

  const extractErrorMessages = (errors) => {
    const messages = [errors];
    Object.keys(errors).forEach((key) => {
      messages.push(errors[key]);
    });
    console.error("Extracted error messages:", messages);
  };

  return (
    <div className={styles.contactFormContainer}>
      <div className={styles.contactInfo}>
        <h2>Get in Touch</h2>
        <p>
          Have any questions or need assistance? We're here to help! Reach out
          to us at:
        </p>
        <span>
          <p>
            <img src="/assets/phone.png" alt="Phone" />
            +446379048255
          </p>
          <p>
            <img src="/assets/mail.png" alt="Mail" />
            info@travelwithhydra.com
          </p>
        </span>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.contactForm}>
        <span>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name*"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div className={styles.error}>{formik.errors.first_name}</div>
            ) : null}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name*"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <div className={styles.error}>{formik.errors.last_name}</div>
            ) : null}
          </div>
        </span>
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number*"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className={styles.error}>{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className={styles.inputGroup}>
          <textarea
            name="message"
            placeholder="Your message..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message ? (
            <div className={styles.error}>{formik.errors.message}</div>
          ) : null}
        </div>
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      {submissionMessage && (
        <div className={styles.submissionMessage}>
          {submissionMessage}
        </div>
      )}
      </form>
    </div>
  );
};

export default ContactForm;
