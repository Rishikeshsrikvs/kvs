import React, { useState, useEffect } from 'react';
import './Serviceland.css';
import br1 from './../../assets/images/landservice/br1.png';
import br2 from './../../assets/images/landservice/br2.png';
import se1 from './../../assets/images/landservice/se1.png';
import se2 from './../../assets/images/landservice/se2.png';
import sm1 from './../../assets/images/landservice/sm1.png';
import sm2 from './../../assets/images/landservice/sm2.png';
import we1 from './../../assets/images/landservice/we1.png';
import we2 from './../../assets/images/landservice/we2.png';
import servicevi from './../../assets/images/landservice/servicevid.mp4';
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const services = [
  {
    title: 'SMM',
    title2: "SOCIAL MEDIA MARKETING",
    description: 'Our Social Media Management service helps you engage with your audience, build brand awareness, and drive traffic to your website.',
    images: [sm1, sm2, servicevi]
  },
  {
    title: 'BRANDING',
    title2: "BRANDING",
    description: 'Transform your online identity and make a lasting impression with our tailored SEO services. We focus on amplifying your brand’s visibility, driving meaningful engagement, and showcasing your unique value.',
    images: [br1, br2, servicevi]
  },
  {
    title: 'WEBSITE',
    title2: "WEBSITE DEVELOPMENT",
    description: 'Our Web Design and Development service aims to create a compelling online presence, optimize user experience, and drive conversions for your business.',
    images: [we1, we2, servicevi]
  },
  {
    title: 'SEO',
    title2: "SEARCH ENGINE OPTIMIZATION",
    description: "Our Search Engine Optimization service improves your website's visibility on search engines, increasing organic traffic and boosting your online presence.",
    images: [se1, se2, servicevi]
  }
];

const Serviceland = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [titleTranslateClass, setTitleTranslateClass] = useState('');
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration in ms
      once: false,     // Whether animation should happen only once
    });
  }, []);
  useEffect(() => {
    // Force reflow to reset the animation
    setAnimationClass(''); 
    void document.querySelector('.servicecard.active')?.offsetWidth; 

    setAnimationClass('scale-animate');
  }, [currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleTranslateClass('');
    }, 300); 

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

  return (
    <div className="landservicemain">
      <h1 className={`servicetitleani ${titleTranslateClass}`} data-aos="zoom-in" >
        {services[currentIndex].title}
      </h1>
      <div className="servicecard-container">
        {services.map((service, index) => (
          <div
            key={index}
            className={`servicecard ${index === currentIndex ? 'active scale-animate' : ''}`}
          >
            <div className="servicecardleft">
              <h2 className="servicecardleft-title">{service.title2}</h2>
              <p className="servicecardleft-description">{service.description}</p>
            </div>
            <div className="servicecardright">
              <div className="servicecardimg1">
                <img src={service.images[0]} alt="" />
              </div>
              <div className="servicecardimg2">
                <img src={service.images[1]} alt="" />
              </div>
              <div className="servicecardimg3">
                <video src={service.images[2]} autoPlay muted loop playsInline />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="servicecardbtn">
        <button onClick={prevService} data-aos="fade-right" >Previous</button>
        <button onClick={nextService} data-aos="fade-left">Next</button>
      </div>
    </div>
  );
};

export default Serviceland;
