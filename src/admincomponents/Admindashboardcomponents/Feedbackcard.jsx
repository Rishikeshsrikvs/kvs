import React from 'react';


export const Feedbackcard = ({ feedback }) => {
  return (
    <div className='feedbackcard'>
        <div className="feedback">{feedback.message}rewr</div>
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
            <button className='reject'>Reject</button>
            <button className='approve'>Approve</button>
        </div>
    </div>
  );
};
