import React from 'react';
import './Footer.css';
import logo from './../assets/images/logo.png';
import { Link } from 'react-router-dom';
import fbicon from './../assets/images/footfb.png';
import inicon from './../assets/images/footin.png';
import instaicon from './../assets/images/footinsta.png';

export const Footer = () => {
  return (
    <div className="footermaincontainer">
        <div className="kvsdetails">
            <img src={logo} alt="Company Logo" className="footer-logo" />
            <p>
              We offer a comprehensive suite of digital marketing services that cover all aspects of our online presence. From SEO and social media marketing to content creation and PPC advertising, we have the expertise and resources to handle diverse marketing needs.
            </p>
            <div className="footersm">
              <Link to="#"><img src={fbicon} alt="Facebook" /></Link>
              <Link to="#"><img src={inicon} alt="LinkedIn" /></Link>
              <Link to="#"><img src={instaicon} alt="Instagram" /></Link>
            </div>
        </div>
        <div className="footnav">
          <p className="footnavhead footnavleft">Navigation</p>
          <Link to="/about"><p>About Us</p></Link>
          <Link to="/services"><p>Services</p></Link>
          <Link to="/projects"><p>Projects</p></Link>
          <Link to="/blogs"><p>Blogs</p></Link>
          <Link to="/careers"><p>Careers</p></Link>
        </div>
        <div className="footnav footnavcenter">
          <p className="footnavhead">Services</p>
          <Link to="/website-designing"><p>Website Designing</p></Link>
          <Link to="/social-media-marketing"><p>Social Media Marketing</p></Link>
          <Link to="/seo"><p>SEO</p></Link>
        </div>
        <div className="footnav footnavaddress">
          <p className="footnavhead">Contact Us</p>
          <Link to=""><p>+91 9444885453</p></Link>
          <Link to=""><p>info@srikvstech.com</p></Link>
          <p>No.19, Kamaraj Nagar,<br/>Main Road, Avadi,<br/>Chennai-600071</p>
        </div>
    </div>
  );
};
