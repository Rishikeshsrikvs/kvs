import React, { useState } from "react";
import api from "../../api/api";
import "./AddProjects.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

export const AddProject = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [projectEmail, setProjectEmail] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage1, setProjectImage1] = useState(null); // For first image
  const [projectImage2, setProjectImage2] = useState(null); // For second image
  const [favorite, setFavorite] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const token = useAuth();

  const validateForm = () => {
    let formErrors = {};

    if (!projectName.trim()) {
      formErrors.projectName = "Project Name is required";
    }

    if (!projectEmail.trim()) {
      formErrors.projectEmail = "Project Email is required";
    } else if (!/\S+@\S+\.\S+/.test(projectEmail)) {
      formErrors.projectEmail = "Email address is invalid";
    }

    if (!projectDescription.trim()) {
      formErrors.projectDescription = "Project Description is required";
    }

    if (!projectImage1 || !projectImage2) {
      formErrors.projectImages = "Both images are required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("projectEmail", projectEmail);
    formData.append("projectDescription", projectDescription);
    formData.append("project-images", projectImage1); // Append first image
    formData.append("project-images", projectImage2); // Append second image
    formData.append("favourite", favorite);

    try {
      await api.post("/api/admin/projectUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${token}`, // Ensure token is passed correctly
        },
      });
      setSuccessMessage("Project added successfully!");
      resetForm(); // Reset form after success
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project.");
    }
  };

  const resetForm = () => {
    setProjectName("");
    setProjectEmail("");
    setProjectDescription("");
    setProjectImage1(null); // Reset first image
    setProjectImage2(null); // Reset second image
    setFavorite(false);
    setErrors({});
  };

  return (
    <div className="addpromain">
      <h1>Add New Project</h1>
      <div className="arpbackcon">
        <button onClick={() => navigate(-1)}>back</button>
      </div>
      <form onSubmit={handleSubmit} className="addprocon">
        <div className="aprcard">
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          {errors.projectName && <p className="error">{errors.projectName}</p>}
        </div>
        <div className="aprcard">
          <label>Project Email:</label>
          <input
            type="email"
            value={projectEmail}
            onChange={(e) => setProjectEmail(e.target.value)}
            required
          />
          {errors.projectEmail && (
            <p className="error">{errors.projectEmail}</p>
          )}
        </div>
        <div className="aprcard">
          <label>Project Description:</label>
          <textarea
            maxlength="600"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
          {errors.projectDescription && (
            <p className="error">{errors.projectDescription}</p>
          )}
        </div>
        <div className="aprcard">
          <label>Project Images:</label>
          <div className="aprimg">
            <label htmlFor="aprim1">Choose image 1</label>
            <input
              type="file"
              id="aprim1"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setProjectImage1)}
              required
            />
            {projectImage1 && (
              <span className="uploadedimgtext">{projectImage1.name}</span>
            )}
            {errors.projectImages && (
              <p className="error">{errors.projectImages}</p>
            )}
          </div>
          <div className="aprimg">
            <label htmlFor="aprim2">Choose image 2</label>
            <input
              type="file"
              id="aprim2"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setProjectImage2)}
              required
            />
            {projectImage2 && (
              <span className="uploadedimgtext">{projectImage2.name}</span>
            )}
            {errors.projectImages && (
              <p className="error">{errors.projectImages}</p>
            )}
          </div>
          <div className="arpfav">
            <label>FAVORITE</label>
            <input
              type="checkbox"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
            />
          </div>
        </div>
        <div className="addprobtn">
          <button type="submit">Add Project</button>
        </div>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};
