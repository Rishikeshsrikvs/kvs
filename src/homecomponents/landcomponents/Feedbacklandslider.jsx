import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feedbackslider.css';
import fb1 from './../../assets/images/feedbackclient/cart.webp';
import fb2 from './../../assets/images/feedbackclient/central.jpg';
import fb3 from './../../assets/images/feedbackclient/eifil.jpg';
import fb4 from './../../assets/images/feedbackclient/images.jpeg';

const fallbackImages = [fb1, fb2, fb3, fb4];

const getRandomFallbackImage = () => {
  const randomIndex = Math.floor(Math.random() * fallbackImages.length);
  return fallbackImages[randomIndex];
};

const Feedbacklandslider = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:3500/feedbacks');
        console.log('Fetched data:', response.data);
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

  return (
    <div className="landfeedbackmain">
      <div className='landfeedback1'></div>
      <div className="landfeedbacksub">
        <div className="landfeedbacktitle">
          <h1>What do we do exactly?</h1>
          <p>We only do 3 things. But we do them really well.</p>
        </div>
        <div className='landfeedbackslider'>
          <div className='landsider-wrapper'>
            {[...feedbacks, ...feedbacks].map((feedback, index) => (
              <div className='landfeedbackcard' key={index}>
                <div className='landfeedback'>{feedback.message}</div>
                <div className='landclientcontainer'>
                  <div className='landclient'>
                    <img
                      src={feedback.clientImage || getRandomFallbackImage()}
                      alt={feedback.clientName || 'Client Image'}
                    />
                    <span>
                      <h4>{feedback.clientName}</h4>
                      <h5>{feedback.clientLocation}</h5>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='landfeedback2'></div>
    </div>
  );
};

export default Feedbacklandslider;
