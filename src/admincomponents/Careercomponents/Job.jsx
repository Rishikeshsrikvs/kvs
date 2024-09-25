import React from "react";
import api from "../../api/api";
import { useAuth } from "../Auth/AuthContext";

export const Job = ({ job, onDelete }) => {
  const { token } = useAuth();

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/admin/jobDelete/${job._id}`, {
        headers: {
          authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        onDelete(job._id); // Trigger the parent to refresh the job list
      } else {
        console.error("Failed to delete the job");
      }
    } catch (error) {
      console.error("Error deleting the job:", error);
    }
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <span className="job-name">{job.jobName}</span>
        <span className="job-location">{job.location}</span>
      </div>
      <div className="job-details">
        <span className="job-applicants">{job.applicantCount} Total</span>
        <span className="job-shortlisted">0 Shortlisted</span>
      </div>
      <div className="job-actions">
        <button className="delete-btn" onClick={handleDelete}>
          Close The Application
        </button>
      </div>
      <div className="job-footer">
        <span className="job-date">
          Posted: {new Date(job.date).toLocaleDateString()}
        </span>
        {job.urgentHiring && (
          <span className="urgent-hiring-badge">Urgent Hiring</span>
        )}
      </div>
    </div>
  );
};
