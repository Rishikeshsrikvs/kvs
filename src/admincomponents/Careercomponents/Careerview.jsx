import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Job } from './Job';
import { useAuth } from '../Auth/AuthContext';

export const Careerview = () => {
  const [jobs, setJobs] = useState([]);
  const { token } = useAuth();

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://srikvs.onrender.com/api/admin/getjobs', {
        headers: {
          'authorization': `${token}`,
        },
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
    // Optionally, re-fetch jobs from the server
    // fetchJobs(); 
  };

  return (
    <div className='cvmaincon'>
      <div className="cvtitle">
        <div className="lefttitle">
          <h2>MANAGE JOBS AND RESPONSE</h2>
          <h4>Manage job and response</h4>
        </div>
        <div className="righttitle">
          <Link to="/"><button>BACK</button></Link>
          <Link to="/admin/postjob"><button>POST A JOB</button></Link>
        </div>
      </div>
      <div className="cvcontentcon">
        <div className="contentright">
          <div className="jobcontainer">
            {jobs.map((job) => (
              <Job key={job._id} job={job} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
