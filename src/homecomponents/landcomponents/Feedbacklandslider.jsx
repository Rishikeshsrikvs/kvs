import React, { useEffect, useState } from 'react';
import api from '../../api/api';
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
        const response = await api.get('/testimonials');
        console.log('Fetched feedbacks:', response.data.message);
        const feedbacks = response.data.message;
        console.log();
        
        const feedbacksWithImages = await Promise.all(
          feedbacks.map(async feedback => {
            if (feedback.profileImage) {
              try {
                const imageResponse = await api.get(`/getProfileImage/${feedback.profileImage}`, {
                  responseType: 'blob' // Fetch image as a blob
                });

                // Check if the response contains a valid blob
                if (imageResponse.data.size > 0) {
                  const imageBlob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
                  const imageUrl = URL.createObjectURL(imageBlob);

                  return { ...feedback, imageUrl };
                } else {
                  console.warn(`Empty image for feedback: ${feedback.client_name}`);
                  return { ...feedback, imageUrl: getRandomFallbackImage() };
                }

              } catch (err) {
                console.error('Error fetching image:', err);
                return { ...feedback, imageUrl: getRandomFallbackImage() };
              }
            } else {
              return { ...feedback, imageUrl: getRandomFallbackImage() };
            }
          })
        );

        setFeedbacks(feedbacksWithImages);
        setLoading(false);
      } catch (err) {
        setError('Error fetching feedback data.');
        setLoading(false);
        console.error('Error fetching feedbacks:', err);
      }
    };

    fetchFeedbacks();

    // Cleanup object URLs to prevent memory leaks
    return () => {
      feedbacks.forEach(feedback => {
        if (feedback.imageUrl && feedback.imageUrl.startsWith('blob:')) {
          URL.revokeObjectURL(feedback.imageUrl);
        }
      });
    };
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
              onError={(e) => { e.target.src = getRandomFallbackImage(); }} // Fallback on image error
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
