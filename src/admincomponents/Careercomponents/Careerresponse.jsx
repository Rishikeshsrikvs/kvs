import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export const Careerresponse = ({ jobId }) => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchJobResponses = async () => {
      try {
        const response = await Axios.get('http://localhost:3500/jobs'); // Replace with your JSON server URL
        const jobs = response.data.jobs;
        const job = jobs.find(job => job.jobId === jobId);
        if (job && job.response) {
          setResponses(job.response);
        }
      } catch (error) {
        console.error('Error fetching job responses:', error);
      }
    };

    fetchJobResponses();
  }, [jobId]);

  return (
    <div className='responsecontainer'>
      <div className="reshead">
        <div className="restitle">
          <h2>RESPONSE FOR THE POST</h2>
          <h3>Manage Jobs And Response</h3>
        </div>
        <Link to="/admin/jobs"><button>BACK TO MENU</button></Link>
      </div>
      <div className="resmaincon">
        <table>
          <thead>
            <tr>
              <th>Applicant ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Experience</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {responses.map(response => (
              <tr key={response.applicantId}>
                <td>{response.applicantId}</td>
                <td>{response.name}</td>
                <td>{response.location}</td>
                <td>{response.experience}</td>
                <td>{response.email}</td>
                <td><a href={response.resume} target="_blank" rel="noopener noreferrer">View Resume</a></td>
                <td>{response.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
