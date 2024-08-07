import React from 'react';
import { useLocation } from 'react-router-dom';
import './JobDetails.css';

const JobDetails = () => {
  const location = useLocation();
  const job = location.state?.job; // Use optional chaining to handle null

  if (!job) {
    return <p>No job details available.</p>;
  }

  return (
    <div className="job-details">
      <h1>{job.title}</h1>
      <p><span>Level:</span> {job.level}</p>
      <p><span>Experience:</span> {job.experience}</p>
      <p><span>Location:</span> {job.location}</p>
      <p><span>Description:</span> {job.description}</p>
    </div>
  );
};

export default JobDetails;
