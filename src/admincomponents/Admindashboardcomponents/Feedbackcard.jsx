import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';


export const Feedbackcard = ({ feedback }) => {
  const [status, setStatus] = useState(feedback.status === 'true');
  const { token } = useAuth();
  const handleApprove = async () => {
    try {
      await axios.put(`https://srikvstech.onrender.com/api/admin/testimonialApproval`,
        {testimonialId:feedback._id, 
        headers: {
        authorization: `${token}`,
      }
      
    });
      setStatus(true);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`https://srikvstech.onrender.com/api/admin/testimonialDecline`,
        {testimonialId:feedback._id,
        headers: {
          authorization: `${token}`,
        }
      }   
      );
      setStatus(false);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  return (
    <div className='feedbackcard'>
      <div className="feedback">{feedback.description}</div>
      <div className="clientcontainer">
        <div className='client'>
          <img src={feedback.clientImage} alt={feedback.name} />
          <span>
            <h4>{feedback.name}</h4>
            <h5>{feedback.contact}</h5>
          </span>
        </div>
        <span className='clientlogo'>{feedback.clientLogo}</span>
      </div>
      <div className="action">
        <button
          className={`button reject ${status === false ? 'true' : ''}`}
          onClick={handleReject}
        >
          Reject
        </button>
        <button
          className={`button approve ${status === true ? 'true' : ''}`}
          onClick={handleApprove}
        >
          Approve
        </button>
      </div>
    </div>
  );
};
