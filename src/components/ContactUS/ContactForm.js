// components/ContactForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("This field is required"),
      lastName: Yup.string().required("This field is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
      phone: Yup.string().required("This field is required"),
      message: Yup.string().required("This field is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission
    },
  });

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
            <img src="/assets/phone.png" />
            +1611 111 1111
          </p>
          <p>
            <img src="/assets/mail.png" />
            info@flyhydra.com
          </p>
        </span>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.contactForm}>
        <span>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className={styles.error}>{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name*"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className={styles.error}>{formik.errors.lastName}</div>
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
      </form>
    </div>
  );
};

export default ContactForm;
