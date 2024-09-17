import React, { useState, useEffect } from 'react';
import './Aprojects.css';
import api from '../../api/api';
import { useAuth } from '../Auth/AuthContext';

export const Project = ({ project, onLike , onDelete}) => {
// Assuming 'api' is provided by 'useAuth'
  const [imageUrl, setImageUrl] = useState('');
  const { token } = useAuth();

  const handleLikeClick = () => {
    onLike(project._id, !project.favourite);
  };
  const handleDelete = () => {
    onDelete(project._id);
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (project.projectImageName1) {
        try {
          const imageResponse = await api.get(`/api/admin/getProjectImage/${project.projectImageName1}`, {
            responseType: 'blob',
            headers: { authorization: token }
          });

          // Check if the blob is valid
          if (imageResponse.data.size > 0 && imageResponse.data.type.startsWith('image/')) {
            const imageBlob = new Blob([imageResponse.data], { type: imageResponse.data.type });
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);
          } else {
            console.error('Received blob is not a valid image');
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    };

    fetchImage();

    return () => {
      if (imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [project.projectImageName1, api, token]);

  return (
    <div className="project">
      <div className="projectimage">
        <img src={imageUrl} alt={project.projectImageName1} className="projectimg" />
        <button
          className={`favheart ${project.favourite ? 'favheart-filled' : 'favheart-outline'}`}
          onClick={handleLikeClick}
        />
      </div>
      <div className="projectdetails">
        <h3>{project.projectName}</h3>
        <p>{project.projectEmail}</p>
        <p>{project.projectDescription}</p>
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};
