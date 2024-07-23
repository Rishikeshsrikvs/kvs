import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './../../assets/images/logo.png';


// Utility function to generate a unique ID
const generateJobId = () => `job-${Date.now()}`;

export const Careerpost = () => {
  const [formData, setFormData] = useState({
    jobId: generateJobId(), // Initialize with a unique jobId
    jobName: '',
    experience: '',
    location: '',
    salary: '',
    skills: '',
    description: '',
    applications: '', // Added number of applications field
    companyName: 'SRI KVS TECH' // Set default company name
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/jobs', formData);
      if (response.status === 201) {
        console.log('Job posted successfully');
        // Reset form data if needed
        setFormData({
          jobId: generateJobId(), // Generate a new jobId for the next job posting
          jobName: '',
          experience: '',
          location: '',
          salary: '',
          skills: '',
          description: '',
          applications: '', // Reset number of applications field
          companyName: 'SRI KVS TECH' // Reset company name
        });
      }
    } catch (error) {
      console.error('Failed to post job', error);
    }
  };

  return (
    <div className='careerpost'>
      <div className="cptitle">
        <div className="cptitleleft">
          <Link to="/admin/dashboard/career"><button className='cpbackmenubtn'>BACK</button></Link>
        </div>
        <div className='cpright'>
          <button className='cppublishbtn' onClick={handleSubmit}>PUBLISH</button>
          <button className='cppreviewbtn'>PREVIEW</button>
        </div>
      </div>
      <div className="cpsubtitle">
        <h2>JOB DETAILS</h2>
      </div>
      <div className="cpcontentcontainer">
        <div className="cpsidecontainer">
          <div className="cpsideinput">
            <label htmlFor="jobName">JOB NAME</label>
            <input type="text" name="jobName" value={formData.jobName} onChange={handleChange} />
          </div>
          <div className="cpsideinput">
            <label htmlFor="experience">EXPERIENCE</label>
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
          </div>
          <div className="cpsideinput">
            <label htmlFor="location">LOCATION</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div className="cpsideinput">
            <label htmlFor="salary">SALARY</label>
            <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
          </div>
          <div className="cpsideinput">
            <label htmlFor="skills">SKILLS REQUIRED</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} />
          </div>
          <div className="cpsideinput">
            <label htmlFor="applications">NUMBER OF APPLICATIONS</label>
            <input type="number" name="applications" value={formData.applications} onChange={handleChange} />
          </div>
          <div className="cpsideinput" id='inputbox'>
            <label htmlFor="description">DESCRIPTION</label>
            <textarea name="description" id="inputbox" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className='cpsidesubmit'>
            <input  type="submit" onClick={handleSubmit} value="POST A JOB"/>
          </div>
        </div>
        <div className="cpmaincontainer">
          <div className="cpmainsubcontainer">
            <div className="cpjobcard1">
              <div className="cpjobcard1left">
                <div className="jobheading">
                  <h2>{formData.jobName || "JOB NAME"}</h2>
                  <h5>{formData.companyName}</h5>
                </div>
                <div className="jobpoints">
                  <div className="jobpointsrow">
                    <div className="experience jpitem"><h4>{formData.experience || "EXPERIENCE"}</h4></div>
                    <div className="jpitem"><h4>Openings: 10</h4></div>
                  </div>
                  <div className="jobpointsrow">
                    <div className="location jpitem"><h4>{formData.location || "LOCATION"}</h4></div>
                    <div className="vacancy jpitem"><h4>Applicants: {formData.applications || "0"}</h4></div>
                  </div>
                  <div className="jobpointsrow">
                    <div className="salary jpitem"><h4>{formData.salary || "SALARY"}</h4></div>
                    <div className="date jpitem"><h4>Posted: Today</h4></div>
                  </div>
                </div>
              </div>
              <div className="cpjobcard1right">
                <img src={logo} alt="Company Logo" />
              </div>
            </div>
            <div className="cpjobcard2">
              <div className="cphighlights">
                <h4>JOB HIGHLIGHTS</h4>
                <ul>
                  <li><p>Skills: {formData.skills || "SKILLS REQUIRED"}</p></li>
                  <li><p>Description: {formData.description || "DESCRIPTION"}</p></li>
                </ul>
              </div>
              <div className="cpaboutcn">
                <h4>About</h4>
                <p>
                    We are a software research and development firm with over two solid decades of industrial experience, 
                    having voyaged through various tasks, which consist of the following:
                    </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
