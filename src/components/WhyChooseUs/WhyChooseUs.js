import React from "react";
import style from "./WhyChooseUs.module.css";
const WhyChooseUs = () => {
  return (
    <div className={`${style.why_choose_us}`}>
      <div className={`${style.left_container}`}>
        <img src="./assets/whychooseus.png" />
      </div>
      <div className={`${style.right_container}`}>
        <h1>Why Choose Us</h1>
        <p>
          Enjoy different experiences in every place you visit and discover new
          and affordable adventures of course.
        </p>
        <div className={`${style.card_container}`}>
          <div className={`${style.card}`}>
            <div className={`${style.card_image}`}>
              <img src="./assets/flight.png" />
            </div>
            <div className={`${style.card_text}`}>
              <h3>Flight Ticket</h3>
              <p>Vitae donec pellentesque a aliquam et ultricies auctor. </p>
            </div>
          </div>
          <div className={`${style.card}`}>
            <div className={`${style.card_image}`}>
              <img src="./assets/hotel.png" />
            </div>
            <div className={`${style.card_text}`}>
              <h3>Accomodation</h3>
              <p>Vitae donec pellentesque a aliquam et ultricies auctor. </p>
            </div>
          </div>
          <div className={`${style.card}`}>
            <div className={`${style.card_image}`}>
              <img src="./assets/bagpack.png" />
            </div>
            <div className={`${style.card_text}`}>
              <h3>Packaged Tour</h3>
              <p>Vitae donec pellentesque a aliquam et ultricies auctor. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
