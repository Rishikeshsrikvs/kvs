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
        const response = await axios.get('https://srikvs.onrender.com/testimonials');
        console.log('Fetched data:', response.data.message);
        const feedbacks = response.data.message;

        // Fetch images for each feedback
        const feedbacksWithImages = await Promise.all(
          feedbacks.map(async feedback => {
            if (feedback.profileImage) {
              try {
                const imageResponse = await axios.get(`https://srikvs.onrender.com/getimage/${feedback.profileImage}`, {
                  responseType: 'blob' // Fetch image as a blob
                });
                // Create a URL for the image blob
                const imageBlob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
                const imageUrl = URL.createObjectURL(imageBlob);
                
                return { ...feedback, imageUrl };
              } catch (error) {
                console.error('Error fetching image:', error);
                return { ...feedback, imageUrl: getRandomFallbackImage() };
              }
            } else {
              return { ...feedback, imageUrl: getRandomFallbackImage() };
            }
          })
        );

        setFeedbacks(feedbacksWithImages);
        setLoading(false);
      } catch (error) {
        setError('Error fetching feedback data.');
        setLoading(false);
        console.error('Error:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const renderFeedbacks = () => {
    return [...feedbacks, ...feedbacks].map((feedback, index) => (
      <div className='landfeedbackcard' key={index}>
        <div className='landfeedback'>{feedback.description}</div>
        <div className='landclientcontainer'>
          <div className='landclient'>
            <img
              src={feedback.imageUrl}
              alt={feedback.client_name || 'Client Image'}
              loading="lazy" // Lazy load images
            />
            <span>
              <h4>{feedback.client_name}</h4>
            </span>
          </div>
        </div>
      </div>
    ));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
            {renderFeedbacks()}
          </div>
        </div>
      </div>
      <div className='landfeedback2'></div>
    </div>
  );
};

export default Feedbacklandslider;
