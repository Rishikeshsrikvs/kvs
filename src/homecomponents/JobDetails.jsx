import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './JobDetails.css';
import api from '../api/api';
import formdown from './../assets/images/career/formdown.png';
import formup from './../assets/images/career/formup.png';
import careertitleback from './../assets/images/career/careertitle.png';

const JobDetails = () => {
  const location = useLocation();
  const job = location.state?.job;

  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    contact: '',
    location: '',
    skills: '',
    experience: '',
    previousCompany: '',
    currentRole: '',
    currentCTC: '',
    expectedCTC: '',
    linkedinLink: '',
    githubLink: '',
    behanceLink: '',
    education: [
      {
        degree: '',
        yearOfPassing: '',
        branch: '',
        university: '',
        coursesDone: ['']
      }
    ],
    appliedJob: job?._id || '',
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');  // Added state for success message

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'candidateName':
        if (!value) error = 'Candidate name is required';
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email is invalid';
        }
        break;
      case 'contact':
        if (!value) {
          error = 'Contact is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Contact must be a 10-digit number';
        }
        break;
      case 'location':
        if (!value) error = 'Location is required';
        break;
      case 'skills':
        if (!value) error = 'Skills are required';
        break;
      case 'experience':
        if (!value) {
          error = 'Experience is required';
        } else if (isNaN(value)) {
          error = 'Experience must be a number';
        }
        break;
      case 'resume':
        if (!value) error = 'Resume is required';
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const fieldError = validateField(name, value);
    setErrors({
      ...errors,
      [name]: fieldError,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      resume: file,
    });

    const fieldError = validateField('resume', file);
    setErrors({
      ...errors,
      resume: fieldError,
    });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value
    };
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleCoursesChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index].coursesDone = value.split(',').map(course => course.trim());
    setFormData({ ...formData, education: updatedEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: '',
          yearOfPassing: '',
          branch: '',
          university: '',
          coursesDone: ['']
        }
      ]
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData({ ...formData, education: updatedEducation });
  };

  const validateForm = () => {
    let formErrors = {};
    for (const key in formData) {
      if (key !== 'education') {
        const error = validateField(key, formData[key]);
        if (error) {
          formErrors[key] = error;
        }
      }
    }

    // Validate education fields
    formData.education.forEach((edu, index) => {
      if (!edu.degree) formErrors[`education[${index}].degree`] = 'Degree is required';
      if (!edu.yearOfPassing) formErrors[`education[${index}].yearOfPassing`] = 'Year of Passing is required';
      if (!edu.branch) formErrors[`education[${index}].branch`] = 'Branch is required';
      if (!edu.university) formErrors[`education[${index}].university`] = 'University is required';
      if (!edu.coursesDone.length) formErrors[`education[${index}].coursesDone`] = 'At least one course is required';
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      if (key === 'education') {
        formData.education.forEach((edu, index) => {
          data.append(`education[${index}][degree]`, edu.degree);
          data.append(`education[${index}][yearOfPassing]`, edu.yearOfPassing);
          data.append(`education[${index}][branch]`, edu.branch);
          data.append(`education[${index}][university]`, edu.university);
          data.append(`education[${index}][coursesDone]`, edu.coursesDone.join(','));
        });
      } else if (key === 'resume') {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await api.post('/apply', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Application submitted successfully!');  // Set success message
      setFormData({
        candidateName: '',
        email: '',
        contact: '',
        location: '',
        skills: '',
        experience: '',
        previousCompany: '',
        currentRole: '',
        currentCTC: '',
        expectedCTC: '',
        linkedinLink: '',
        githubLink: '',
        behanceLink: '',
        education: [
          {
            degree: '',
            yearOfPassing: '',
            branch: '',
            university: '',
            coursesDone: ['']
          }
        ],
        appliedJob: job?._id || '',
        resume: null,
      });  // Reset form data
      setErrors({});
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
                <h2 key={index}>{skill}</h2>
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
        <h1>About</h1>
        <div className="jd3dcon">
                  <p>
                    We are a software research and development firm with over two solid decades of industrial experience,
                    having voyaged through various tasks, which consist of the following:
                  </p>
                </div>
      </div>

      <div className="jd4main">
        
        <form className="jd4sub" onSubmit={handleSubmit}>
        <h1>APPLY NOW</h1>
          {/* Form Fields */}
          <div className="jd4in">
            <label>Full Name</label>
            <input type="text" name="candidateName" value={formData.candidateName} onChange={handleInputChange} />
            {errors.candidateName && <p className="error">{errors.candidateName}</p>}
          </div>
          <div className="jd4in">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="jd4in">
            <label>Contact</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
            {errors.contact && <p className="error">{errors.contact}</p>}
          </div>
          <div className="jd4in">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
            {errors.location && <p className="error">{errors.location}</p>}
          </div>
          <div className="jd4in">
            <label>Skills</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} />
            {errors.skills && <p className="error">{errors.skills}</p>}
          </div>
          <div className="jd4in">
            <label>Experience</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} />
            {errors.experience && <p className="error">{errors.experience}</p>}
          </div>
          <div className="jd4in">
            <label>Previous Company</label>
            <input type="text" name="previousCompany" value={formData.previousCompany} onChange={handleInputChange} />
          </div>
          <div className="jd4in">
            <label>Current Role</label>
            <input type="text" name="currentRole" value={formData.currentRole} onChange={handleInputChange} />
          </div>
          <div className="jd4in">
            <label>Current CTC</label>
            <input type="text" name="currentCTC" value={formData.currentCTC} onChange={handleInputChange} />
          </div>
          <div className="jd4in">
            <label>Expected CTC</label>
            <input type="text" name="expectedCTC" value={formData.expectedCTC} onChange={handleInputChange} />
          </div>
          <div className="jd4in">
            <label>LinkedIn Profile</label>
            <input type="text" name="linkedinLink" value={formData.linkedinLink} onChange={handleInputChange} />
          </div>
          <div className="jd4in">
            <label>GitHub Profile</label>
            <input type="text" name="githubLink" value={formData.githubLink} onChange={handleInputChange} />
          </div>
          <div className="jd4in">
            <label>Behance Profile</label>
            <input type="text" name="behanceLink" value={formData.behanceLink} onChange={handleInputChange} />
          </div>

          {/* Education Fields */}
          {formData.education.map((edu, index) => (
            <div key={index} className="education-section jd4in">
              <h2>Education {index + 1}</h2>
              <div>
                <label>Degree</label>
                <input type="text" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
                {errors[`education[${index}].degree`] && <p className="error">{errors[`education[${index}].degree`]}</p>}
              </div>
              <div>
                <label>Year of Passing</label>
                <input type="text" name="yearOfPassing" value={edu.yearOfPassing} onChange={(e) => handleEducationChange(index, e)} />
                {errors[`education[${index}].yearOfPassing`] && <p className="error">{errors[`education[${index}].yearOfPassing`]}</p>}
              </div>
              <div>
                <label>Branch</label>
                <input type="text" name="branch" value={edu.branch} onChange={(e) => handleEducationChange(index, e)} />
                {errors[`education[${index}].branch`] && <p className="error">{errors[`education[${index}].branch`]}</p>}
              </div>
              <div>
                <label>University</label>
                <input type="text" name="university" value={edu.university} onChange={(e) => handleEducationChange(index, e)} />
                {errors[`education[${index}].university`] && <p className="error">{errors[`education[${index}].university`]}</p>}
              </div>
              <div>
                <label>Courses Done</label>
                <input type="text" name="coursesDone" value={edu.coursesDone.join(', ')} onChange={(e) => handleCoursesChange(index, e)} />
                {errors[`education[${index}].coursesDone`] && <p className="error">{errors[`education[${index}].coursesDone`]}</p>}
              </div>
              <button className="removeedu"type="button" onClick={() => removeEducation(index)}>Remove Education</button>
            </div>
          ))}
          <button className="addedu" type="button" onClick={addEducation}>Add Education</button>

          {/* Resume Upload */}
          <div className="jd4in jd4resume">
            <label htmlFor='resume'>Upload Resume</label>
            <input type="file" name="resume" onChange={handleFileChange} />
            {errors.resume && <p className="error">{errors.resume}</p>}
          </div>

          {/* Success Message */}
          {successMessage && <p className="success">{successMessage}</p>}

          {/* Submit Button */}
          <button className="jd4submit" type="submit">Submit Application</button>
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
