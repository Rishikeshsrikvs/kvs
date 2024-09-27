import React from 'react';
import './Workmarq.css';
import { useEffect } from 'react';
import vector from './../../assets/images/workimages/vector.png';
import AOS from "aos";
import "aos/dist/aos.css";
const services = [
  "Website Design & Development",
  "Digital Consultancy",
  "Social Marketing",
  "Branding Strategy",
  "Search Engine Optimization"
];

const Workmarq = () => {
  useEffect(() => {
    
    window.scrollTo(0, 0);
    AOS.init({
      duration: 2000, // Animation duration in ms
      once: false,     // Whether animation should happen only once
    });
  }, []);
  return (
    <div className='marqmain' data-aos="zoom-in">
      <div className="marq1rotate">
        <div className='marq1container'>
         
          {services.concat(services).map((service, index) => (
            <span className='mainspan' key={index}>
              <span className='textspan'>{service}</span>
              <img className='spanimg' src={vector} alt='' />
            </span>
          ))}
        </div>
      </div>
      <div className="marq2rotate"  >
        <div className='marq1container' >
          {/* Render the services twice for seamless scrolling */}
          {services.concat(services).map((service, index) => (
            <span className='mainspan' key={index}>
              <span className='textspan'>{service}</span>
              <img className='spanimg' src={vector} alt='' />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workmarq;
