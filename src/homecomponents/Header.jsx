import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from './../assets/images/logo.png';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar-container ${isVisible ? 'visible' : 'hidden'}`}>
      <div className='navbar-logo'>
        <img src={logo} alt="Logo" />
      </div>
      <div className='navcontainer'>
        <ul className='navul'>
          <li><Link to="/">ABOUT US</Link></li>
          <li><Link to="/">PROJECTS</Link></li>
          <li><Link to="/">SERVICES <span></span></Link></li>
          <li><Link to="/">BLOGS</Link></li>
          <li><Link to="/">CAREER</Link></li>
        </ul>
      </div>
    </div>
  );
};
