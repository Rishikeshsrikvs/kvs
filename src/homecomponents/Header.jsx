import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from './../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`navbar-container ${isVisible ? 'visible' : 'hidden'}`}>
      <div className='navbar-logo'>
        <NavLink to="/"><img src={logo} alt="Logo" /></NavLink>
        <div className={`navbar-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      
      <div className={`navcontainer ${isMenuOpen ? 'active' : ''}`}>
        <ul className='navul'>
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>ABOUT US</NavLink></li>
          <li><NavLink to="/projects" className={({ isActive }) => (isActive ? 'active-link' : '')}>PROJECTS</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => (isActive ? 'active-link' : '')}>SERVICES</NavLink></li>
          <li><NavLink to="/blogs" className={({ isActive }) => (isActive ? 'active-link' : '')}>BLOGS</NavLink></li>
          <li><NavLink to="/career" className={({ isActive }) => (isActive ? 'active-link' : '')}>CAREER</NavLink></li>
        </ul>
      </div>
    </div>
  );
};
