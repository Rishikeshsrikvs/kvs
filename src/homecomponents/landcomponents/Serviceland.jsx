import React, { useState, useEffect } from 'react';
import './Serviceland.css';

const services = [
  {
    title: 'WEBSITE',
    description: 'Description for Service 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    images: ['img1', 'img2', 'img3']
  },
  {
    title: 'SEO',
    description: 'Description for Service 2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    images: ['img1', 'img2', 'img3']
  },
  {
    title: 'DIGITAL',
    description: 'Description for Service 3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    images: ['img1', 'img2', 'img3']
  },
  {
    title: 'BRANDING',
    description: 'Description for Service 4. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    images: ['img1', 'img2', 'img3']
  }
];

const Serviceland = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [titleTranslateClass, setTitleTranslateClass] = useState('');

  useEffect(() => {
    setAnimationClass('scale-animate');
    const timer = setTimeout(() => {
      setAnimationClass('');
    }, 1000); // Duration should match CSS transition duration

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const nextService = () => {
    setTitleTranslateClass('title-translate-up');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevService = () => {
    setTitleTranslateClass('title-translate-down');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleTranslateClass('');
    }, 1000); // Duration should match CSS animation duration

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="landservicemain">
      <h1 className={`servicetitleani ${titleTranslateClass}`}>
        {services[currentIndex].title}
      </h1>
      <div className="servicecard-container">
        {services.map((service, index) => (
          <div
            key={index}
            className={`servicecard ${index === currentIndex ? 'active scale-animate' : ''}`}
          >
            <div className="servicecardleft">
              <h2 className="servicecardleft-title">{service.title}</h2>
              <p className="servicecardleft-description">{service.description}</p>
            </div>
            <div className="servicecardright">
              {service.images.map((img, i) => (
                <div key={i} className={`servicecardimg${i + 1}`}>
                  {img}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="servicecardbtn">
        <button onClick={prevService}>Previous</button>
        <button onClick={nextService}>Next</button>
      </div>
    </div>
  );
};

export default Serviceland;
