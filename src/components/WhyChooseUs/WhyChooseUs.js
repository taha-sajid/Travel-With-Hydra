"use client";
import React, { useEffect, useRef } from "react";
import style from "./WhyChooseUs.module.css";
const WhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add(style.visible);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <div ref={sectionRef} className={`${style.why_choose_us}`}>
      <div className={`${style.left_container}`}>
        <img src="./assets/why.jpg" />
      </div>
      <div className={`${style.left_container_mob}`}>
        <img src="./assets/upword.jpg" />
      </div>
      <div className={`${style.right_container}`}>
        <h1>Why Choose Us</h1>
        <p>
        We provide the most streamlined alternative to the traditional cumbersome visa process.
        </p>
        <div className={`${style.card_container}`}>
          <div className={`${style.card}`}>
            <div className={`${style.card_image}`}>
              <img src="./assets/getintouch.png" />
            </div>
            <div className={`${style.card_text}`}>
              <h3>Get in Touch</h3>
              <p>Just fill a simplified form on our website.</p>
            </div>
          </div>
          <div className={`${style.card}`}>
            <div className={`${style.card_image}`}>
              <img src="./assets/getvisa.png" />
            </div>
            <div className={`${style.card_text}`}>
              <h3>Get Your Visa</h3>
              <p>Receive your e-visa in fastest time.</p>
            </div>
          </div>
          <div className={`${style.card}`}>
            <div className={`${style.card_image}`}>
              <img src="./assets/flyaway.png" />
            </div>
            <div className={`${style.card_text}`}>
              <h3>Fly Away</h3>
              <p>Make your travel dreams come true. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
