import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} footer`}>
      <div className={styles.footer_content}>
        <div className={styles.footer_section}>
          <img src="/assets/logo.png" alt="Logo" className={styles.logo} style={{width: "100%"}} />
        </div>
        <div className={styles.footer_section}>
          <h3>Stay Connected</h3>
          <span>
            <p>Email: info@travelwithhydra.com</p>
            <p>Phone: +446379048255</p>
          </span>
          <p>Follow us on social media</p>
          <div className={styles.social_icons}>
            <a href="https://www.facebook.com/share/cC4n6ttYo5MFCk3K/?mibextid=LQQJ4d" target="_blank">
            <i className="fa fa-facebook-square" aria-hidden="true"></i>
            </a>
            <a href="https://instagram.com/travelwithydra" target="_blank">
            <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <p>All Rights Reserved by Travel with Hydra</p>
      </div>
    </footer>
  );
};

export default Footer;
