import React from 'react';
import './Workmarq.css';
import vector from './../../assets/images/workimages/vector.png';

const services = [
  "Website Design & Development",
  "Digital Consultancy",
  "Social Marketing",
  "Branding Strategy",
  "Search Engine Optimization"
];

const Workmarq = () => {
  return (
    <div className='marqmain'>
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
      <div className="marq2rotate">
        <div className='marq1container'>
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
