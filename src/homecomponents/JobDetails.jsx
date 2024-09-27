import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./JobDetails.css";
import api from "../api/api";
import formdown from "./../assets/images/career/formdown.png";
import formup from "./../assets/images/career/formup.png";
import careertitleback from "./../assets/images/career/careertitle.png";

const JobDetails = () => {
  const location = useLocation();
  const { id } = useParams(); // Extract job ID from URL
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null); // Job data state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [resumeName, setResumeName] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 2000, once: false });
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/getjobs");
        setJobs(response.data);
        const selectedJob = response.data.find((job) => job._id === id);
        setJob(selectedJob);
        setLoading(false);
      } catch (err) {
        setError("Failed to load jobs");
        setLoading(false);
      }
    };
    fetchJobs();
  }, [id]);

  const [formData, setFormData] = useState({
    candidateName: "",
    email: "",
    contact: "",
    location: "",
    skills: "",
    experience: "",
    previousCompany: "",
    currentRole: "",
    currentCTC: "",
    expectedCTC: "",
    linkedinLink: "",
    githubLink: "",
    behanceLink: "",
    education: [
      {
        degree: "",
        yearOfPassing: "",
        branch: "",
        university: "",
        coursesDone: [""],
      },
    ],
    appliedJob: id || "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "candidateName":
        if (!value) error = "Candidate name is required";
        break;
      case "email":
        if (!value || !/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case "contact":
        if (!value || !/^\d{10}$/.test(value)) error = "Contact must be 10 digits";
        break;
      case "location":
        if (!value) error = "Location is required";
        break;
      case "skills":
        if (!value) error = "Skills are required";
        break;
      case "experience":
        if (!value || isNaN(value)) error = "Experience must be a number";
        break;
      case "resume":
        if (!value) error = "Resume is required";
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
    setResumeName(file ? file.name : "");
    const fieldError = validateField("resume", file);
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
      [name]: value,
    };
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleCoursesChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index].coursesDone = value
      .split(",")
      .map((course) => course.trim());
    setFormData({ ...formData, education: updatedEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: "",
          yearOfPassing: "",
          branch: "",
          university: "",
          coursesDone: [""],
        },
      ],
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
      if (key !== "education") {
        const error = validateField(key, formData[key]);
        if (error) {
          formErrors[key] = error;
        }
      }
    }

    formData.education.forEach((edu, index) => {
      if (!edu.degree) formErrors[`education[${index}].degree`] = "Degree is required";
      if (!edu.yearOfPassing) formErrors[`education[${index}].yearOfPassing`] = "Year of Passing is required";
      if (!edu.branch) formErrors[`education[${index}].branch`] = "Branch is required";
      if (!edu.university) formErrors[`education[${index}].university`] = "University is required";
      if (!edu.coursesDone.length) formErrors[`education[${index}].coursesDone`] = "At least one course is required";
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    for (const key in formData) {
      if (key === "education") {
        formData.education.forEach((edu, index) => {
          data.append(`education[${index}][degree]`, edu.degree);
          data.append(`education[${index}][yearOfPassing]`, edu.yearOfPassing);
          data.append(`education[${index}][branch]`, edu.branch);
          data.append(`education[${index}][university]`, edu.university);
          data.append(
            `education[${index}][coursesDone]`,
            edu.coursesDone.join(",")
          );
        });
      }  else if (key === "resume") {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }
    const structuredData = {
      ...formData,
      education: formData.education.map(edu => ({
        degree: edu.degree,
        yearOfPassing: edu.yearOfPassing,
        branch: edu.branch,
        university: edu.university,
        coursesDone: edu.coursesDone,
      })),
    };
  
    console.log("Form Data Before API Update:", JSON.stringify(structuredData, null, 2));
  
    try {
      console.log("Form Data Before API Update:", data);
      const response = await api.post("/apply", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Application submitted successfully!");
      setTimeout(() => {
        setSuccessMessage(""); // Clear the message after 3 seconds
      }, 7000);
      setFormData({
        candidateName: "",
        email: "",
        contact: "",
        location: "",
        skills: "",
        experience: "",
        previousCompany: "",
        currentRole: "",
        currentCTC: "",
        expectedCTC: "",
        linkedinLink: "",
        githubLink: "",
        behanceLink: "",
        education: [
          {
            degree: "",
            yearOfPassing: "",
            branch: "",
            university: "",
            coursesDone: [""],
          },
        ],
        appliedJob: job?._id || "",
        resume: null,
      });
      setResumeName("");
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="jobdetailparent">
      <div className="jd1main">
        <h1  data-aos="fade-right">
          We’re hiring
          <span className="jd4titleback">
            <img src={careertitleback} alt="" data-aos="zoom-in" />
          </span>
        </h1>
        <h1 data-aos="fade-right">{job.jobName}</h1>
      </div>

      <div className="jd2main">
        <h1 data-aos="fade-right">What you’ll do</h1>
        <div className="jd2cardcon" data-aos="fade-up">
          <div className="jdcard1" >
            <h1>EXPERIENCE</h1>
            <div className="jdline"></div>
            <h1>{job.experienceMin} - {job.experienceMax} years</h1>
          </div>
          <div className="jdcard2">
            <h1>SKILLS</h1>
            <div className="jdline"></div>
            <div className="jdskillcon">
              {job.skills.map((skill, index) => (
                <h2 key={index}>{skill}</h2>
              ))}
            </div>
          </div>
          <div className="jdcard3">
            <h1>SALARY</h1>
            <div className="jdline"></div>
            <h1>{job.salaryMin} - {job.salaryMax} LPA</h1>
          </div>
          <div className="jdcard4">
            <h1>LOCATION</h1>
            <div className="jdline"></div>
            <h1>{job.location}</h1>
          </div>
        </div>
      </div>

      <div className="jd3main">
        <h1 data-aos="fade-right">Job Highlights</h1>
        <div className="jd3dcon">
          <pre data-aos="fade-up">{job.jobDescription}</pre>
        </div>
        <h1 data-aos="fade-right">About</h1>
        <div className="jd3dcon">
          <p data-aos="fade-right">
            We are a software research and development firm with over two decades of industrial experience.
          </p>
        </div>
      </div>

      <div className="jd4main">
      <form className="jd4sub" data-aos="zoom-in" onSubmit={handleSubmit}>
          <h1 data-aos="zoom-in">APPLY NOW</h1>
          {/* Form Fields */}
          <div className="jd4in">
            <label>Full Name <span className="inreq">*</span></label>
            <input
              type="text"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleInputChange}
            />
            {errors.candidateName && (
              <p className="error">{errors.candidateName}</p>
            )}
          </div>
          <div className="jd4in">
            <label>Email Address<span className="inreq">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="jd4in">
            <label>Contact<span className="inreq">*</span></label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
            {errors.contact && <p className="error">{errors.contact}</p>}
          </div>
          <div className="jd4in">
            <label>Location<span className="inreq">*</span></label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
            {errors.location && <p className="error">{errors.location}</p>}
          </div>
          <div className="jd4in">
            <label>Skills<span className="inreq">*</span></label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
            />
            {errors.skills && <p className="error">{errors.skills}</p>}
          </div>
          <div className="jd4in">
            <label>Experience<span className="inreq">*</span></label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
            />
            {errors.experience && <p className="error">{errors.experience}</p>}
          </div>
          <div className="jd4in">
            <label>Previous Company</label>
            <input
              type="text"
              name="previousCompany"
              value={formData.previousCompany}
              onChange={handleInputChange}
            />
          </div>
          <div className="jd4in">
            <label>Current Role</label>
            <input
              type="text"
              name="currentRole"
              value={formData.currentRole}
              onChange={handleInputChange}
            />
          </div>
          <div className="jd4in">
            <label>Current CTC</label>
            <input
              type="text"
              name="currentCTC"
              value={formData.currentCTC}
              onChange={handleInputChange}
            />
          </div>
          <div className="jd4in">
            <label>Expected CTC</label>
            <input
              type="text"
              name="expectedCTC"
              value={formData.expectedCTC}
              onChange={handleInputChange}
            />
          </div>
          <div className="jd4in">
            <label>LinkedIn Profile</label>
            <input
              type="text"
              name="linkedinLink"
              value={formData.linkedinLink}
              onChange={handleInputChange}
            />
          </div>
          <div className="jd4in">
            <label>GitHub Profile</label>
            <input
              type="text"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleInputChange}
            />
          </div>
          <div className="jd4in">
            <label>Behance Profile</label>
            <input
              type="text"
              name="behanceLink"
              value={formData.behanceLink}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="jd4in">
            <label>Courses Done</label>
            <input type="text" name="coursesDone" />
          </div> */}

          {/* Education Fields */}
          {formData.education.map((edu, index) => (
            <div key={index} className="education-section jd4in">
              <h2>Education {index + 1}</h2>
              <div>
                <label>Degree <span className="inreq">*</span></label>
                <input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, e)}
                />
                {errors[`education[${index}].degree`] && (
                  <p className="error">
                    {errors[`education[${index}].degree`]}
                  </p>
                )}
              </div>
              <div>
                <label>Year of Passing <span className="inreq">*</span></label>
                <input
                  type="text"
                  name="yearOfPassing"
                  value={edu.yearOfPassing}
                  onChange={(e) => handleEducationChange(index, e)}
                />
                {errors[`education[${index}].yearOfPassing`] && (
                  <p className="error">
                    {errors[`education[${index}].yearOfPassing`]}
                  </p>
                )}
              </div>
              <div>
                <label>Branch <span className="inreq">*</span></label>
                <input
                  type="text"
                  name="branch"
                  value={edu.branch}
                  onChange={(e) => handleEducationChange(index, e)}
                />
                {errors[`education[${index}].branch`] && (
                  <p className="error">
                    {errors[`education[${index}].branch`]}
                  </p>
                )}
              </div>
              <div>
                <label>University <span className="inreq">*</span></label>
                <input
                  type="text"
                  name="university"
                  value={edu.university}
                  onChange={(e) => handleEducationChange(index, e)}
                />
                {errors[`education[${index}].university`] && (
                  <p className="error">
                    {errors[`education[${index}].university`]}
                  </p>
                )}
              </div>
              {/*<div>
                <label>Courses Done</label>
                <input type="text" name="coursesDone" value={edu.coursesDone.join(', ')} onChange={(e) => handleCoursesChange(index, e)} />
                {errors[`education[${index}].coursesDone`] && <p className="error">{errors[`education[${index}].coursesDone`]}</p>}
              </div> */}
              <button
                className="removeedu"
                type="button"
                onClick={() => removeEducation(index)}
              >
                Remove Education
              </button>
            </div>
          ))}
          <button className="addedu" type="button" onClick={addEducation}>
            Add Education
          </button>

          {/* Resume Upload */}
          <div className="jd4in jd4resume">
            <label htmlFor="resumejd4in">Upload Resume<span className="inreq">*</span></label>
            {resumeName && <p className="resume-name">{resumeName}</p>}
            <input
              type="file"
              name="resume"
              id="resumejd4in"
              title="Choose"
              onChange={handleFileChange}
            />
            {errors.resume && <p className="error">{errors.resume}</p>}
          </div>

          {/* Success Message */}
          {successMessage && <p className="applysuccess">{successMessage}</p>}

          {/* Submit Button */}
          <button className="jd4submit" type="submit">
            SUBMIT APPLICATION
          </button>
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
