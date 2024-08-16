import React from 'react';
import { useLocation } from 'react-router-dom';
import './JobDetails.css';
import formdown from './../assets/images/career/formdown.png';
import formup from './../assets/images/career/formup.png';
import careertitleback from './../assets/images/career/careertitle.png';

const JobDetails = () => {
  const location = useLocation();
  const job = location.state?.job; // Use optional chaining to handle null

  if (!job) {
    return <p>No job details available.</p>;
  }

  return (
    <div className="jobdetailparent">
      <div className="jd1main">
        <h1>We’re hiring 
          <span className='jd4titleback'>
            <span className='jd4titleback1'><img src={careertitleback} alt="" /></span>
            <span className='jd4titleback2'><img src={careertitleback} alt="" /></span>
          </span>
        </h1>
        <h1>{job.jobName}</h1>
      </div>

      <div className="jd2main">
        <h1>What you’ll do</h1>
        <div className="jd2cardcon">
          <div className="jdcard1">
            <h1>EXPERIENCE</h1>
            <div className='jdline'></div>
            <h1>{job.experienceMin} - {job.experienceMax} years</h1>
          </div>
          <div className='jdcard2'>
            <h1>SKILLS</h1>
            <div className='jdline'></div>
            
              <div className="jdskillcon">
                {job.skills.map((skill, index) => (
                  <h2 key={index}>{skill}</h2> // Display each skill
                ))}
              </div>
            
          </div>
          <div className='jdcard3'>
            <h1>SALARY</h1>
            <div className='jdline'></div>
            <h1>{job.salaryMin} - {job.salaryMax}LPA</h1>
          </div>
          <div className='jdcard4'>
            <h1>LOCATION</h1>
            <div className='jdline'></div>
            <h1>{job.location}</h1>
          </div>
        </div>
      </div>

      <div className="jd3main">
        <h1>Job Highlights</h1>
        <div className="jd3dcon">
          <p>{job.jobDescription}</p>
        </div>
      </div>

      <div className="jd4main">
        <form className="jd4sub">
          <h1>Drop us a line</h1>
          <div className="jd4in">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <div className="jd4in">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="jd4in">
            <label htmlFor="mobile">Mobile No</label>
            <input type="tel" id="mobile" />
          </div>
          <div className="jd4resume">
            <input type="file" id="resume" />
            <label htmlFor="resume">Upload Resume</label>
          </div>
          <input type="submit" className="jd4submit" />
          <div className="jd4back1">
            <img src={formup} alt="" />
          </div>
          <div className="jd4back2">
            <img src={formdown} alt="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobDetails;
