import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feedbackslider.css';
import fb1 from './../../assets/images/feedbackclient/cart.webp';
import fb2 from './../../assets/images/feedbackclient/central.jpg';
import fb3 from './../../assets/images/feedbackclient/eifil.jpg';
import fb4 from './../../assets/images/feedbackclient/images.jpeg';

// Define fallback images
const fallbackImages = [fb1, fb2, fb3, fb4];

const getRandomFallbackImage = () => {
  const randomIndex = Math.floor(Math.random() * fallbackImages.length);
  return fallbackImages[randomIndex];
};

const Feedbacklandslider = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // State for current slide index

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:3500/feedbacks');
        console.log('Fetched data:', response.data); // Debugging line
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
    <div className='landfeeddbackslidmaincontainer'>
      <div className='landfeedbackslider'>
        
          {feedbacks.map((feedback, index) => (
            
              <div className='landfeedbackcard'>
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
  );
};

export default Feedbacklandslider;
