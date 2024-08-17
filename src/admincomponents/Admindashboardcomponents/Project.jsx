import React from 'react';
import './Aprojects.css';
import filledHeart from './../../assets/images/heartfilled.png';
import outlineHeart from './../../assets/images/heartoutline.png';

export const Project = ({ project, onLike }) => {
  const handleLikeClick = () => {
    onLike(project.id, !project.favorite);
  };

  return (
    <div className="project">
      <div className="projectimage">
        <img src={project.projectView} alt={project.projectName} className="projectimg" />
        <button
          className={`favheart ${project.favorite ? 'favheart-filled' : 'favheart-outline'}`}
          onClick={handleLikeClick}
          style={{
            backgroundImage: `url(${project.favorite ? filledHeart : outlineHeart})`
          }}
        />
      </div>
      <div className="projectdetails">
        <h3>{project.projectName}</h3>
        <p>{project.projectEmail}</p>
        <p>{project.projectDescription}</p>
      </div>
    </div>
  );
};
