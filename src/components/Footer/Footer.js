import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} footer`}>
      <div className={styles.footer_content}>
        <div className={styles.footer_section}>
          <img src="/assets/logo.png" alt="Logo" className={styles.logo} />
          <p>
            Lorem ipsum dolor sit amet consectetur. Egestas amet sollicitudin
            pretium tortor sed in. Nunc id risus ut diam purus lacus id
            pellentesque at nibh bibendum arcu.
          </p>
        </div>
        <div className={styles.footer_section}>
          <h3>Stay Connected</h3>
          <span>
            <p>Email: info@example.com</p>
            <p>Phone: (+1) 611 111 1111</p>
          </span>
          <p>Follow us on social media</p>
          <div className={styles.social_icons}>
            <i class="fa fa-facebook-square" aria-hidden="true"></i>
            <i class="fa fa-facebook-square" aria-hidden="true"></i>
            <i class="fa fa-facebook-square" aria-hidden="true"></i>
            <i class="fa fa-facebook-square" aria-hidden="true"></i>
            <i class="fa fa-facebook-square" aria-hidden="true"></i>
            <i class="fa fa-facebook-square" aria-hidden="true"></i>
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
