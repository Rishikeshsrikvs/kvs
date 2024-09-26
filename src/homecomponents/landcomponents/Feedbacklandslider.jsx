import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './Feedbackslider.css';
import Marquee from "react-fast-marquee";
import fb1 from './../../assets/images/feedbackclient/cart.webp';
import fb2 from './../../assets/images/feedbackclient/central.jpg';
import fb3 from './../../assets/images/feedbackclient/eifil.jpg';
import fb4 from './../../assets/images/feedbackclient/images.jpeg';
import AOS from "aos";
import "aos/dist/aos.css";

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
    AOS.init({
      duration: 2000, // Animation duration in ms
      once: false,     // Whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get('/testimonials');
        const feedbacks = response.data.message;

        const feedbacksWithImages = await Promise.all(
          feedbacks.map(async feedback => {
            if (feedback.imageName) {
              try {
                const imageResponse = await api.get(`/getProfileImage/${feedback.imageName}`, {
                  responseType: 'blob'
                });

                if (imageResponse.data.size > 0 && imageResponse.data.type.startsWith('image/')) {
                  const imageBlob = new Blob([imageResponse.data], { type: imageResponse.data.type });
                  const imageUrl = URL.createObjectURL(imageBlob);
                  return { ...feedback, imageUrl };
                } else {
                  return { ...feedback, imageUrl: getRandomFallbackImage() };
                }
              } catch (err) {
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
      }
    };

    fetchFeedbacks();

    return () => {
      feedbacks.forEach(feedback => {
        if (feedback.imageUrl && feedback.imageUrl.startsWith('blob:')) {
          URL.revokeObjectURL(feedback.imageUrl);
        }
      });
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="landfeedbackmain">
      <div className='landfeedback2'></div>
      <div className="landfeedbacksub">
        <div className="landfeedbacktitle" data-aos="zoom-in">
          <h1>What do we do exactly?</h1>
          <p>We only do 3 things. But we do them really well.</p>
        </div>
        <Marquee
  className="landsider-wrapper"
  speed={70}
  pauseOnHover={true}
  gradient={false} // Remove the gradient effect, which can sometimes create an illusion of stuttering
  loop={0} // Infinite looping (already the default, but you can explicitly specify)
>
  {feedbacks.map((feedback, index) => (
    <div className='landfeedbackcard' key={index}>
      <div className='landfeedback'>{feedback.description}</div>
      <div className='landclientcontainer'>
        <div className='landclient'>
          <img
            src={feedback.imageUrl}
            alt={feedback.client_name || 'Client Image'}
            loading="lazy"
            onError={(e) => { e.target.src = getRandomFallbackImage(); }}
          />
          <span>
            <h4>{feedback.name}</h4>
          </span>
        </div>
      </div>
    </div>
  ))}
</Marquee>

      </div>
    </div>
  );
};

export default Feedbacklandslider;
