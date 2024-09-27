import React from 'react';
import './Aboutteam.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import inteam from './../../assets/images/team/teamin.png';
import harish from './../../assets/images/team/harish.jpg';
import vimalraj from './../../assets/images/team/vimalraj.jpeg';
import balasir from './../../assets/images/team/Bala sir.png';
import profile from './../../assets/images/team/profile.png';
import charumathi from './../../assets/images/team/charumathi.jpeg';
import saraswathi from './../../assets/images/team/saraswathi.jpeg';
import balamani from './../../assets/images/team/balamnani.jpeg';
import surya from './../../assets/images/team/surya.jpeg';
import AOS from "aos";
import "aos/dist/aos.css"; 

const Aboutteam = () => {

  useEffect(() => {
    
    window.scrollTo(0, 0);
    AOS.init({
      duration: 2000, // Animation duration in ms
      once: false,     // Whether animation should happen only once
    });
  }, []);

  // Array of team members
  const teamMembers = [
    {
      id: 1,
      name: 'Baalakrishanan',
      role: 'Managing Director',
      imageUrl: balasir,
      linkedin: "https://www.linkedin.com/company/am-baalakrishnan",  // Corrected key
    },
    {
      id: 2,
      name: '-',
      role: 'Manager',
      imageUrl: profile,
      linkedin: "",  // Corrected key
    },
    {
      id: 3,
      name: 'Arokia Vimal Raj T',
      role: 'Tech Team Lead',
      imageUrl: vimalraj,
      linkedin: "https://www.linkedin.com/in/mervimal/",  // Corrected key
    },
    {
      id: 4,
      name: 'Dhanam',
      role: 'Digital Marketing Executive',
      imageUrl: profile,
      linkedin: "https://www.linkedin.com/in/dhanam-arivuselvan-91583a25a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",  // Corrected key
    },
    {
      id: 5,
      name: 'Saraswathi',
      role: 'Digital Marketing Executive',
      imageUrl: saraswathi,
      linkedin: "https://www.linkedin.com/in/saraswathi-murugesan-32a1b12a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",  // Corrected key and URL
    },
    {
      id: 6,
      name: 'Harish Velan',
      role: 'Deployment',
      imageUrl: harish,
      linkedin: "https://www.linkedin.com/in/harish-velan-9a84b3288",  // Corrected key
    },
    {
      id: 7,
      name: 'Rishikesh',
      role: 'Frontend Developer',
      imageUrl: profile,
      linkedin: "https://www.linkedin.com/in/rishikesh-a-456174251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",  // Corrected key
    },
    {
      id: 8,
      name: 'Surya',
      role: 'UI & UX Designer',
      imageUrl: surya,
      linkedin: "https://www.linkedin.com/in/suryar17/",  // Corrected key
    },
    {
      id: 9,
      name: 'Bala Manikumar',
      role: 'Graphic Designer',
      imageUrl: balamani,
      linkedin: "https://www.linkedin.com/in/bala-manikumar-299344235?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",  // Corrected key
    },
    {
      id: 10,
      name: 'Shamim',
      role: 'Telecaller',
      imageUrl: profile,
      linkedin: "",  // Corrected key
    },
    // Add more team members as needed
  ];

  return (
    <div className='aboutteammain'>
      <div className="aboutteamcon">
        <h1 data-aos="zoom-in">Our Team</h1>
        <span data-aos="zoom-in"></span>
        <div className="teamcon">
          {teamMembers.map(member => (
            <div key={member.id} className="team-member" data-aos="fade-up">
              <div className="memberprofile">
                <img src={member.imageUrl} alt="" className="team-member-img" />
                <h3>{member.name}</h3>
              </div>
              <p>{member.role}</p>
              
                <Link to={member.linkedin} className="inimg" target='_blank'>
                  <span className='inspanmain'>
                    <img src={inteam} alt="" />
                    <span>LINKEDIN</span>
                  </span>
                </Link>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Aboutteam;
