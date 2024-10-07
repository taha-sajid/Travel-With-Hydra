import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { MdRemoveRedEye } from "react-icons/md";
import { useSelector } from "react-redux";
import { getMyApplications } from "@/api/visa";
import { useAuthToken } from "@/api/customHooks";
import { IMAGE_BASE_URL } from "@/api/config";
import Link from "next/link";

const Dashboard = () => {
  const token = useAuthToken();
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const authState = useSelector((state) => state.auth);
  const {
    citizenship_country,
    email,
    mobile_number,
    resident_country,
    full_name,
  } = authState.user || {};

  const fetchAllApplications = async () => {
    try {
      const response = await getMyApplications(token);
      if (response.data && Array.isArray(response.data)) {
        setApplications(response.data);
        console.log("get all applications:", response.data);
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching get all applications data:", error);
    }
  };

  useEffect(() => {
    fetchAllApplications();
  }, [token]);

  const handleView = (application) => {
    setSelectedApplication(application); // Set the selected application
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedApplication(null); // Clear the selected application
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isFilePath = (path) => {
    // Regex to check if the path ends with an image file extension
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(path);
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
                    <span className={styles[app.status?.toLowerCase().replace(" ", "_")]}>
                      {app.status}
                    </span>
                  </td>
                  <td className={styles.actionContainer}>
                    <div>
                      <button onClick={() => handleView(app)}>
                        <MdRemoveRedEye className={styles.eyeIcon} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applications found</p>
        )}

        {isModalOpen && selectedApplication && (
          <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
            <h3>Application Details</h3>
        
            <table className={styles.detailsTable}>
              <tbody>
                <tr>
                  <th>Country</th>
                  <td>{selectedApplication.country_name}</td>
                </tr>
                <tr>
                  <th>Visa Type</th>
                  <td>{selectedApplication.visa_type}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{selectedApplication.status}</td>
                </tr>
                <tr>
                  <th>Application Date</th>
                  <td>{formatDate(selectedApplication.application_date)}</td>
                </tr>
              </tbody>
            </table>
        
            <h4>Responses</h4>
        
            <table className={styles.responsesTable}>
              <tbody>
                {Object.entries(selectedApplication.responses).map(
                  ([question, answer], index) => (
                    <tr key={index}>
                      <th>{question}</th>
                      <td>
                        {isFilePath(answer) ? (
                          <div>
                            <Link
                              href={IMAGE_BASE_URL+answer}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="viewButton"
                              style={{ backgroundColor: "#42a7c3", color: "white", padding: "5px 10px", borderRadius: "5px" }}
                            >
                              <button>View File</button>
                            </Link>
                          </div>
                        ) : (
                          <span>{answer}</span>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        )}
      </div>
    </div>
  );
};

export default Dashboard;
