import React from 'react'
import heart from './../../assets/images/heart.png';
import projectimg from './../../assets/images/blogback.jpg';
export const Project = () => {
  return (
    <div className='project'>
        <div className="projectimage">
            <img src={projectimg} alt="" className='projectimg'/>
            <img className="favheart" src={heart} alt="" />
            <div className="projectdetails">
                <h6>project 1</h6>
                <h5>Description of the project</h5>
            </div>
        </div>
    </div>
  )
}
