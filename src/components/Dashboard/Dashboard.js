import React from "react";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { MdRemoveRedEye } from "react-icons/md";

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

  const handleView = (id) => {
    // Logic for viewing an application
    alert(`Viewing application ${id}`);
  };

  const handleEdit = (id) => {
    // Logic for editing an application
    alert(`Editing application ${id}`);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.userInfo}>
          <h3>Jesse Hensley</h3>
          <p>
            <span>
              <IoMdMail />
            </span>
            info@example.com
          </p>
          <p>
            <span className={styles.phoneIcon}>
              <FaPhone />
            </span>
            +16 111 111 111
          </p>
          <p>
            <span>
              <TfiWorld />
            </span>
            United States
          </p>
          <p>
            <span>
              <GrMapLocation />
            </span>
            United Kingdom
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
