import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import logo from './../../assets/images/logo.png';
import { useAuth } from '../Auth/AuthContext';

// Utility function to generate a unique ID
const generateJobId = () => `job-${Date.now()}`;


export const Careerpost = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    jobName: '',
    experienceMin: '', // Changed from 'experience' to 'experienceMin'
    experienceMax: '', // Added experienceMax
    location: '',
    salaryMin: '', // Changed from 'salary' to 'salaryMin'
    salaryMax: '', // Added salaryMax
    skills: '',
    jobDescription: '', // Changed from 'description' to 'jobDescription'
    numberOfVacancies: '', // Changed from 'applications' to 'numberOfVacancies'
    urgentHiring: false, // Added urgentHiring field as a boolean
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
      const response = await api.post('/api/admin/jobpost', 
        formData,
        {
        headers: {
          'authorization': `${token}`,
        },
      }
      );
      if (response.status === 201) {
        console.log('Job posted successfully');
        // Reset form data if needed
        setFormData({
          jobName: '',
          experienceMin: '',
          experienceMax: '',
          location: '',
          salaryMin: '',
          salaryMax: '',
          skills: '',
          jobDescription: '',
          numberOfVacancies: '',
          urgentHiring: false, // Reset urgentHiring field
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
          <Link to="/admin/SHRA/dashboard/career"><button className='cpbackmenubtn'>BACK</button></Link>
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
            <label htmlFor="experienceMin">MINIMUM EXPERIENCE</label>
            <input type="number" name="experienceMin" value={formData.experienceMin} onChange={handleChange} />
          </div>
          <div className="cpsideinput">
            <label htmlFor="experienceMax">MAXIMUM EXPERIENCE</label>
            <input type="number" name="experienceMax" value={formData.experienceMax} onChange={handleChange} />
          </div>
          <div className="cpsideinput">
            <label htmlFor="location">LOCATION</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div className="cpsideinput">
            <label htmlFor="salaryMin">MINIMUM SALARY</label>
            <input type="number" name="salaryMin" value={formData.salaryMin} onChange={handleChange} />
          </div>
          <div className="cpsideinput">
            <label htmlFor="salaryMax">MAXIMUM SALARY</label>
            <input type="number" name="salaryMax" value={formData.salaryMax} onChange={handleChange} />
          </div>
          <div className="cpsideinput">
            <label htmlFor="skills">SKILLS REQUIRED</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} />
          </div>
          <div className="cpsideinput">
            <label htmlFor="numberOfVacancies">NUMBER OF VACANCIES</label>
            <input type="number" name="numberOfVacancies" value={formData.numberOfVacancies} onChange={handleChange} />
          </div>
          <div className="cpsideinput" id='inputbox'>
            <label htmlFor="jobDescription">JOB DESCRIPTION</label>
            <textarea name="jobDescription" id="inputbox" value={formData.jobDescription} onChange={handleChange}></textarea>
          </div>
          <div className="cpsideinput cpsidecheck">
            <label htmlFor="urgentHiring">URGENT HIRING :</label>
            <input
              type="checkbox"
              name="urgentHiring"
              checked={formData.urgentHiring}
              onChange={(e) => setFormData({ ...formData, urgentHiring: e.target.checked })}
            />
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
                </div>
                <div className="jobpoints">
                  <div className="jobpointsrow">
                    <div className="experience jpitem"><h4>{formData.experienceMin || "MIN EXPERIENCE"} - {formData.experienceMax || "MAX EXPERIENCE"} years</h4></div>
                    <div className="jpitem"><h4>Openings: {formData.numberOfVacancies || "0"}</h4></div>
                  </div>
                  <div className="jobpointsrow">
                    <div className="location jpitem"><h4>{formData.location || "LOCATION"}</h4></div>
                    {formData.urgentHiring && (
                        <div className="jpitem"><h4>URGENT HIRING</h4></div>
                      )}
                  </div>
                  <div className="jobpointsrow">
                    <div className="salary jpitem"><h4>{formData.salaryMin || "MIN SALARY"} - {formData.salaryMax || "MAX SALARY"} LPA</h4></div>
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
                
                  <div className='cpsub'>
                    <h4>Skills:</h4>
                    <p> {formData.skills || "SKILLS REQUIRED"}</p>
                    </div>
                  <div>
                    <h4>Description: </h4>
                    <p>{formData.jobDescription || "JOB DESCRIPTION"}</p>
                    </div>
                
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
  );
};
