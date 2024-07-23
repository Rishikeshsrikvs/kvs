import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Aprojects.css';
import { Project } from './Project';

export const Aprojects = () => {
  const [projects, setProjects] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3500/projects');
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
      await axios.patch(`http://localhost:3500/projects/${id}`, { favorite: isLiked });
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

  return (
    <div className="projectmaincontainer">
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
