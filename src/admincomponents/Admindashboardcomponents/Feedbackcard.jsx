import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useAuth } from '../Auth/AuthContext';

export const Feedbackcard = ({ feedback }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchImage = async () => {
      if (feedback.imageName) {
        try {
          const imageResponse = await api.get(`/getProfileImage/${feedback.imageName}`, {
            responseType: 'blob'
          });

          // Check if the blob is valid
          if (imageResponse.data.size > 0 && imageResponse.data.type.startsWith('image/')) {
            const imageBlob = new Blob([imageResponse.data], { type: imageResponse.data.type });
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);
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
  }, [feedback.imageName]);

  const handleApprove = async () => {
    try {
      await api.put(
        `/api/admin/testimonialApproval`,
        { testimonialId: feedback._id },
        { headers: { authorization: `${token}` } }
      );
      setStatus(true);
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  const handleReject = async () => {
    try {
      await api.put(
        `/api/admin/testimonialDecline`,
        { testimonialId: feedback._id },
        { headers: { authorization: `${token}` } }
      );
      setStatus(false);
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  return (
    <div className='feedbackcard'>
      <div className="feedback">{feedback.description}</div>
      <div className="clientcontainer">
        <div className='client'>
          <img
            src={imageUrl}
            alt={feedback.name || 'Client Image'}
          />
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
