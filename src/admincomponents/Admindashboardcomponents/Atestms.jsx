import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import "./Atestms.css";
import { Feedbackcard } from './Feedbackcard';
import { useAuth } from '../Auth/AuthContext';

export const Atestms = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get('/api/admin/testimonials' ,{
          headers: {
            authorization: `${token}`,
          },
        }
        ); // Adjust the URL as necessary
        console.log(response.data);
        
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching feedback data.');

        setLoading(false);
        console.error('Error:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='maincontainer'>
      <div className="title">
        <h1>WHAT OUR CLIENTS SAY</h1>
      </div>
      <div className="cardcontainer">
        {feedbacks.map((feedback) => (
          <Feedbackcard key={feedback._id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};
