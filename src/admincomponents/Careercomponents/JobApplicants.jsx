import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const JobApplicants = () => {
  const { jobId } = useParams();
  const { token } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobAndApplicants = async () => {
      try {
        // Fetch job details
        const jobResponse = await api.get(`/api/admin/getjob/${jobId}`, {
          headers: { 'authorization': `${token}` },
        });
        setJobDetails(jobResponse.data);

        // Fetch applicants
        const applicantIds = jobResponse.data.applicantIds.map(applicant => applicant.applicantId);
        const applicantPromises = applicantIds.map(id =>
          api.get(`/api/admin/applicant/${id}`, {
            headers: { 'authorization': `${token}` },
          })
        );
        const applicantResponses = await Promise.all(applicantPromises);
        setApplicants(applicantResponses.map(res => res.data));
      } catch (error) {
        console.error('Error fetching job and applicants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndApplicants();
  }, [jobId, token]);

  const downloadResume = async (applicantId) => {
    try {
      const response = await api.get(`/api/admin/getresume/${applicantId}`, {
        headers: { 'authorization': `${token}` },
        responseType: 'blob', // Ensure the response is handled as a blob
      });

      // Create a URL for the blob object
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      // Set the download attribute with a filename
      link.setAttribute('download', `resume_${applicantId}.pdf`);

      // Append to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link and revoking the object URL
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="applicants-container">
      {jobDetails && (
        <div className="job-details">
          <h2>Job Details</h2>
          <div className="jobdetailssub">
            <p><strong>Job Name:</strong> {jobDetails.jobName}</p>
            <p><strong>Location:</strong> {jobDetails.location}</p>
            <p><strong>Experience Required:</strong> {jobDetails.experienceMin} - {jobDetails.experienceMax} years</p>
            <p><strong>Salary:</strong> ${jobDetails.salaryMin} - ${jobDetails.salaryMax}</p>
            <p><strong>Skills:</strong> {jobDetails.skills.join(', ')}</p>
            <p><strong>Description:</strong> {jobDetails.jobDescription}</p>
            <p><strong>Number of Vacancies:</strong> {jobDetails.numberOfVacancies}</p>
            <p><strong>Urgent Hiring:</strong> {jobDetails.urgentHiring ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}

      <h2 className="appllititle">Applicants</h2>
      <ul>
        {applicants.map(applicant => (
          <li key={applicant._id} className="applicantcon">
            <h3>{applicant.candidateName}</h3>
            <p>Email: {applicant.email}</p>
            <p>Contact: {applicant.contact}</p>
            <div><button onClick={() => downloadResume(applicant._id)}>Download Resume</button></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobApplicants;
