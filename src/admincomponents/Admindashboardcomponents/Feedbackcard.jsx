import React, { useState } from 'react';
import axios from 'axios';


export const Feedbackcard = ({ feedback }) => {
  const [status, setStatus] = useState(feedback.status === 'true');

  const handleApprove = async () => {
    try {
      await axios.patch(`http://localhost:3500/feedbacks/${feedback.id}`, { status: 'true' });
      setStatus(true);
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(`http://localhost:3500/feedbacks/${feedback.id}`, { status: 'false' });
      setStatus(false);
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  return (
    <div className='feedbackcard'>
      <div className="feedback">{feedback.message}</div>
      <div className="clientcontainer">
        <div className='client'>
          <img src={feedback.clientImage} alt={feedback.clientName} />
          <span>
            <h4>{feedback.clientName}</h4>
            <h5>{feedback.clientLocation}</h5>
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
