import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './Logoslider.css';

const Logoslider = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        // Fetch logo details
        const response = await api.get('/getAllLogo');
        
        const logoDetails = response.data;
        console.log(response);
        
        
        // Fetch images using tokens
        const logoPromises = logoDetails.map(async (logo) => {
          try {
            const imageResponse = await api.get(`/getimage/${logo.imageName}`, {
              responseType: 'blob' // Fetch image as a blob
            });
            // Create a URL for the image blob
            const imageBlob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
            const imageUrl = URL.createObjectURL(imageBlob);
            return imageUrl;
          } catch (error) {
            console.error('Error fetching image:', error);
            return null;
          }
        });

        const logoImages = await Promise.all(logoPromises);
        setLogos(logoImages.filter(image => image !== null)); // Filter out any null images
        setLoading(false);
      } catch (error) {
        setError('Error fetching logo data.');
        setLoading(false);
        console.error('Error:', error);
      }
    };

    fetchLogos();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Duplicate logos for seamless loop
  const allLogos = [...logos, ...logos];

  return (
    <div className="land1clientlogocontainer">
      <div className="scrolling-wrapper">
        {allLogos.map((logo, index) => (
          <div className="scrolling" key={index}>
            <img src={logo} alt={`Logo ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logoslider;
