import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./Aprojects.css";
import { Project } from "./Project";
import { useAuth } from "../Auth/AuthContext";

export const Aprojects = () => {
  const [projects, setProjects] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth();

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const response = await api.get("/api/admin/projects", {
        headers: {
          authorization: token,
        },
      });
      console.log(response.data);

      setProjects(response.data);
      setLikedProjects(response.data.filter((project) => project.favorite));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  // Handle like/unlike project
  const handleLike = async (id, isLiked) => {
    // Optimistically update the UI
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === id ? { ...project, favourite: isLiked } : project
      )
    );

    try {
      const formData = new URLSearchParams();
      formData.append("id", id);
      formData.append("favourite", isLiked);

      await api.put("/api/admin/uptoFav", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: token,
        },
      });

      // Refetch projects after successful like/unlike
      fetchProjects();
    } catch (error) {
      console.error("Error updating project like status:", error);
      // Revert UI change if the request fails
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === id ? { ...project, favourite: !isLiked } : project
        )
      );
    }
  };

  const handleProjectLike = (id, isLiked) => {
    const project = projects.find((p) => p._id === id);
    if (project) {
      if (project.favourite && !isLiked) {
        // If the project is liked and the user wants to unlike it
        if (likedProjects.length > 4) {
          handleLike(id, false);
        } else {
          alert("You must like at least 4 projects.");
        }
      } else if (!project.favourite && isLiked && likedProjects.length < 10) {
        // If the user wants to like the project and they haven't reached the limit
        handleLike(id, true);
      } else if (!project.favourite && isLiked && likedProjects.length >= 10) {
        // If the user has reached the maximum limit of 10 likes
        alert("You can only like up to 10 projects.");
      }
    }
  };

  const handleProjectdelete = async (id) => {
    await api.delete(`/api/admin/project/${id}`, {
      headers: {
        authorization: token,
      },
    });
    fetchProjects();
  };

  const navigateToAddProject = () => {
    navigate("/admin/SHRA/add-project");
  };

  return (
    <div className="projectmaincontainer">
      <button className="add-project-button" onClick={navigateToAddProject}>
        Add Project
      </button>
      <h2>PROJECT SITE</h2>
      <h1>PICK THE FAVOURITES OF OUR WORKS</h1>
      <div className="card-container">
        {projects.map((project) => (
          <Project
            key={project._id}
            project={project}
            onLike={handleProjectLike}
            onDelete={handleProjectdelete}
          />
        ))}
      </div>
    </div>
  );
};
