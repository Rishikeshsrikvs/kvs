import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './Aprojects.css';
import { Project } from './Project';
import { useAuth } from '../Auth/AuthContext';

export const Aprojects = () => {
  const [projects, setProjects] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);
  const navigate = useNavigate();
  const token = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/admin/projects', {
          headers: {
            authorization: `${token}`,
          },
        });
        setProjects(response.data);
        setLikedProjects(response.data.filter(project => project.favorite));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleLike = async (id, isLiked) => {
    try {
      await api.patch(`/api/admin/projects/${id}`, 
      { favorite: isLiked }, 
      {
        headers: {
          authorization: token, // Replace 'your_token_here' with the actual token
        },
      });
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === id ? { ...project, favorite: isLiked } : project
        )
      );
      setLikedProjects(prevLikedProjects =>
        isLiked
          ? [...prevLikedProjects, projects.find(project => project.id === id)]
          : prevLikedProjects.filter(project => project.id !== id)
      );
    } catch (error) {
      console.error('Error updating project like status:', error);
    }
  };

  const handleProjectLike = (id, isLiked) => {
    const project = projects.find(p => p.id === id);
    if (project.favorite && isLiked === false) {
      handleLike(id, false);
    } else if (!project.favorite && isLiked === true && likedProjects.length < 4) {
      handleLike(id, true);
    } else if (!project.favorite && isLiked === true && likedProjects.length >= 4) {
      alert('You can only like up to 4 projects.');
    }
  };

  const navigateToAddProject = () => {
    navigate('/admin/SHRA/add-project'); // Update the path according to your routing setup
  };

  return (
    <div className="projectmaincontainer">
      <button className="add-project-button" onClick={navigateToAddProject}>
        Add Project
      </button>
      <h2>PROJECT SITE</h2>
      <h1>PICK THE FAVOURITES OF OUR WORKS</h1>
      <div className="card-container">
        {projects.map(project => (
          <Project
            key={project.id}
            project={project}
            onLike={handleProjectLike}
          />
        ))}
      </div>
    </div>
  );
};
