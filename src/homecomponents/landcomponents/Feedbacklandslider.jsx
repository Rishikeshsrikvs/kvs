import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import "./Feedbackslider.css";

const Feedbacklandslider = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:3500/feedbacks');
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % Math.ceil(feedbacks.length / 2));
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, [feedbacks.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='maincontainer'>
      
      <div className="slider">
        <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {feedbacks.map((feedback, index) => (
            <div key={feedback.id} className="slide">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedbacklandslider;
