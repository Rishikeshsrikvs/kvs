import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Job } from './Job';

export const Careerview = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3500/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className='cvmaincon'>
      <div className="cvtitle">
        <div className="lefttitle">
          <h2>MANAGE JOBS AND RESPONSE</h2>
          <h4>Manage job and response</h4>
        </div>
        <div className="righttitle">
            <Link><button>BACK</button></Link>
            <Link><button>POST A JOB</button></Link>
        </div>
      </div>
      <div className="cvcontentcon">
        <div className="contentleft">
          <div className="lefttitlefilter">
            <h1>Filters</h1>
          </div>
          <div className="search">
            <input type="search" placeholder='Search by title' />
          </div>
          <div className="status">
            <h2>Job status</h2>
            <div className="checkrow">
              <input type="checkbox" />
              <label htmlFor="">Active jobs</label>
            </div>
            <div className="checkrow">
              <input type="checkbox" />
              <label htmlFor="">Inactive jobs</label>
            </div>
          </div>
          <div className="postby">
            <h2>POST BY</h2>
            <input type="search" placeholder='Search by username' />
            <div className="checkrow">
              <input type="checkbox" />
              <label htmlFor="">HR</label>
            </div>
          </div>
        </div>
        <div className="contentright">
          <div className="catitle">
            <div className="cartitle1">
              <span>All jobs</span>
              <span>Drafts</span>
            </div>
            <div>page No</div>
          </div>
          <div className="rightfilter">
            <div className="rightrow">
              <input type="checkbox" />
              <label htmlFor="">Select All</label>
            </div>
            <div className="rightrow">
              <input type="checkbox" />
              <label htmlFor="">Refresh</label>
            </div>
            <div className="rightrow">
              <input type="checkbox" />
              <label htmlFor="">Collaborate</label>
            </div>
          </div>
          <div className="jobcontainer">
            {jobs.map((job) => (
              <Job key={job.jobId} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
