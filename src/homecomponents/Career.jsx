import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Career.css";

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://srikvs.onrender.com/getjobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='careerparent'>
      <div className="career1main">
        <div className="career1text">
          <h1>Careers <span>&</span></h1>
          <h1>Vacancies</h1>
        </div>
      </div>
      <div className="career2main">
        <div className="career2left">
          <p>Cannot find the suitable vacancy?<br/>
          Drop us a line</p>
        </div>
        <div className="career2right">
          {jobs.map(job => (
            <Link
              to={`/career/${job._id}`} // Use the URL path with the job ID
              state={{ job }} // Pass the job data via state
              className="cjobcard"
              key={job._id}
            >
              <div className="cjobleft">
                <div className="cjup">
                  <h1>{job.jobName}</h1>
                </div>
                <ul className="cjdown">
                  <li>{job.experienceMin} - {job.experienceMax} years experience</li>
                  <li>{job.location}</li>
                </ul>
              </div>
              <div className="cjobright">
                <p>&#8599;</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
