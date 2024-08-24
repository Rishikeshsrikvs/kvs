import React, { useState } from 'react';
import api from '../../api/api';
import './AddProjects.css';
import { useAuth } from '../Auth/AuthContext';

export const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectEmail, setProjectEmail] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectView, setProjectView] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const token = useAuth();

  const validateForm = () => {
    let formErrors = {};

    if (!projectName.trim()) {
      formErrors.projectName = 'Project Name is required';
    }

    if (!projectEmail.trim()) {
      formErrors.projectEmail = 'Project Email is required';
    } else if (!/\S+@\S+\.\S+/.test(projectEmail)) {
      formErrors.projectEmail = 'Email address is invalid';
    }

    if (!projectDescription.trim()) {
      formErrors.projectDescription = 'Project Description is required';
    }

    if (!projectView) {
      formErrors.projectView = 'Project View (Image) is required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('projectEmail', projectEmail);
    formData.append('projectDescription', projectDescription);
    formData.append('project-view', projectView);
    formData.append('favourite', favorite);
    

  
  
    
    try {
      await api.post('/api/admin/projectUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `${token}`, // Replace with actual token
        },
      });
      setSuccessMessage('Project added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project.');
    }
  };

  const resetForm = () => {
    setProjectName('');
    setProjectEmail('');
    setProjectDescription('');
    setProjectView(null);
    setFavorite(false);
    setErrors({});
  };

  return (
    <div className="addpromain">
      <h2>Add New Project</h2>
      <div className="backcon">
        <button>back</button>
      </div>
      <form onSubmit={handleSubmit} className='addprocon'>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          {errors.projectName && <p className="error">{errors.projectName}</p>}
        </div>
        <div>
          <label>Project Email:</label>
          <input
            type="email"
            value={projectEmail}
            onChange={(e) => setProjectEmail(e.target.value)}
            required
          />
          {errors.projectEmail && <p className="error">{errors.projectEmail}</p>}
        </div>
        <div>
          <label>Project Description:</label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
          {errors.projectDescription && <p className="error">{errors.projectDescription}</p>}
        </div>
        <div>
          <label>Project Image:</label>
          <input
            type="file"
            onChange={(e) => setProjectView(e.target.files[0])}
            required
          />
          {errors.projectView && <p className="error">{errors.projectView}</p>}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
            />
            Favorite 
          </label>
        </div>
        <div className='addprobtn'><button type="submit">Add Project</button></div>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};
