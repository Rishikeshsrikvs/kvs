import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Atestms.css";
import { Feedbackcard } from './Feedbackcard';

export const Atestms = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:3500/feedbacks'); // Adjust the URL as necessary
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
          <Feedbackcard key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};
