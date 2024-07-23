import React from 'react';
import { Link } from 'react-router-dom';

export const Job = ({ job }) => {
  return (
    <div className='job'>
      <div className="checkcon">
        <input type="checkbox" />
        <div className="jobdetails">
          <h4>{job.jobName}</h4>
          <h5>{job.location}</h5>
          <h6>{job.status}</h6> {/* Example: "Urgent Hiring" */}
        </div>
      </div>
      <div className="jobnumcon">
        <div className="total">
          <h2>{job.totalApplications}</h2> {/* Replace with the correct value */}
          <h5>Total</h5>
        </div>
        <div className="short">
          <h2>{job.shortlistedApplications}</h2> {/* Replace with the correct value */}
          <h5>Shortlisted</h5>
        </div>
      </div>
      <div className="responsedetails">
        <div className="btnrow">
          <Link to={`/admin/response/${job.jobId}`}>
            <button className='resbtn'>Response</button>
          </Link>
          <button>Refresh</button>
        </div>
        <div className='resdate'>
          <p>Posted by {job.postedBy} @ {job.postedDate}</p> {/* Example values */}
        </div>
      </div>
    </div>
  );
};
