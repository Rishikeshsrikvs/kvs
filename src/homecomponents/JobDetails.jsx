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
    // <div className="job-details">
    //   <h1>{job.title}</h1>
    //   <p><span>Level:</span> {job.level}</p>
    //   <p><span>Experience:</span> {job.experience}</p>
    //   <p><span>Location:</span> {job.location}</p>
    //   <p><span>Description:</span> {job.description}</p>
    // </div>
    <div className="jobdetailparent">
      <div className="jd1main">
        <h1>we’re hiring 
        <span className='jd4titleback'>
            <span className='jd4titleback1'><img src={careertitleback} alt="" /></span>
            <span className='jd4titleback2'><img src={careertitleback} alt="" /></span>
          </span>
        </h1>
        
        <h1>{job.title}</h1>
      </div>

      <div className="jd2main">
        <h1>what you’ll do</h1>
        <div className="jd2cardcon">
          <div className="jdcard1"></div>
          <div className='jdcard2'></div>
          <div className='jdcard3'></div>
          <div className='jdcard4'></div>
        </div>

      </div>
      <div className="jd3main">
        <h1>Job Highlights</h1>
        <div className="jd3dcon">

        </div>

      </div>
      <div className="jd4main">
        
        <form class="jd4sub" action="">
          <h1>Drop us a line</h1>
          <div class="jd4in">
            <label for="name">Name</label>
            <input type="text" id="name" />
          </div>
          <div class="jd4in">
            <label for="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div class="jd4in">
            <label for="mobile">Mobile No</label>
            <input type="tel" id="mobile" />
          </div>
          <div class="jd4resume">
            <input type="file" id="resume" />
            <label for="resume">Upload Resume</label>
          </div>
          <input type="submit" class="jd4submit" />
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
