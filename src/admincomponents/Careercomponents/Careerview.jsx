// src/components/Careerview.js
import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Job } from './Job';
import { useAuth } from '../Auth/AuthContext';

export const Careerview = () => {
  const [jobs, setJobs] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await api.get('/api/admin/getjobs', {
        headers: { 'authorization': `${token}` },
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []); // Run only once on mount

  const handleDelete = (deletedJobId) => {
    setJobs(prevJobs => prevJobs.filter(job => job._id !== deletedJobId));
  };

  const handleJobClick = (jobId) => {
    navigate(`/admin/SHRA/job-applicants/${jobId}`);
  };

  return (
    <div className='cvmaincon'>
      <div className="cvtitle">
        <div className="lefttitle">
          <h2>MANAGE JOBS AND RESPONSE</h2>
          <h4>Manage job and response</h4>
        </div>
        <div className="righttitle">
          <Link to="/admin/SHRA/dashboard"><button>BACK</button></Link>
          <Link to="/admin/SHRA/postjob"><button>POST A JOB</button></Link>
        </div>
      </div>
      <div className="cvcontentcon">
        <div className="contentright">
          <div className="jobcontainer">
            {jobs.map((job) => (
              <div key={job._id} onClick={() => handleJobClick(job._id)}>
                <Job job={job} onDelete={handleDelete} />
              </div>
             
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
