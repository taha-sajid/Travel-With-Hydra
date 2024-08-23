import React from "react";
import styles from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { MdRemoveRedEye } from "react-icons/md";
import { useSelector } from "react-redux";
import { getMyApplications } from "@/api/visa";
import { useAuthToken } from "@/api/customHooks";

const Dashboard = () => {
  const token = useAuthToken();
  const fetchAllApplications = async () => {
    try {
      const response = await getMyApplications(token);
      console.log("get all applications:");

      if (response.data && Array.isArray(response.data)) {
        setApplications(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching get all applications data:", error);
    }
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const [applications, setApplications] = useState([]);
  const authState = useSelector((state) => state.auth);

  const {
    citizenship_country,
    email,
    mobile_number,
    resident_country,
    full_name,
  } = authState.user || {};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.userInfo}>
          <h3>{full_name}</h3>
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
        {applications && applications.length > 0 ? (

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
            {applications.map((app, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{app.country_name}</td>
                <td>{formatDate(app.application_date)}</td>
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
                    {/* <button onClick={() => handleEdit(app.id)}>
                      <img
                        src="/assets/penIcon.png"
                        className={styles.editIcon}
                      />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <p>No applications found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
