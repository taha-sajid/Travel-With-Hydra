import React from "react";
import styles from "./LeftRightArrow.module.css";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

export const PrevArrow = ({ onClick }) => {
  return (
    <div className={styles.icon} onClick={onClick}>
      <IoArrowBackCircleOutline />
    </div>
  );
};

export const NextArrow = ({ onClick }) => {
  return (
    <div className={styles.icon} onClick={onClick}>
      <IoArrowForwardCircleOutline />
    </div>
  );
};
