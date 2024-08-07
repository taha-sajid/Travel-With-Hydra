import React from "react";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { MdRemoveRedEye } from "react-icons/md";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      country: "Portugal",
      submissionDate: "",
    },
    {
      id: 2,
      country: "Portugal",
      submissionDate: "04/21/2024",
      status: "Submitted",
    },
    { id: 3, country: "Portugal", submissionDate: "", status: "" },
    {
      id: 4,
      country: "Portugal",
      submissionDate: "04/21/2024",
      status: "Approved",
    },
  ]);
  const authState = useSelector((state) => state.auth);

  const {
    username,
    citizenship_country,
    email,
    mobile_number,
    resident_country,
  } = authState.user;
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.userInfo}>
          <h3>{username}</h3>
          <p>
            <span>
              <IoMdMail />
            </span>
            {email}
          </p>
          <p>
            <span className={styles.phoneIcon}>
              <FaPhone />
            </span>
            {mobile_number}
          </p>
          <p>
            <span>
              <TfiWorld />
            </span>
            {citizenship_country}
          </p>
          <p>
            <span>
              <GrMapLocation />
            </span>
            {resident_country}
          </p>
        </div>
      </div>
      <div className={styles.mainContent}>
        <h2>Visa Applications</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Country</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.country}</td>
                <td>{app.submissionDate}</td>
                <td>
                  <span className={styles[app.status?.toLowerCase()]}>
                    {app.status}
                  </span>
                </td>
                <td className={styles.actionContainer}>
                  <div>
                    <button onClick={() => handleView(app.id)}>
                      <MdRemoveRedEye className={styles.eyeIcon} />
                    </button>
                    <button onClick={() => handleEdit(app.id)}>
                      <img
                        src="/assets/penIcon.png"
                        className={styles.editIcon}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
