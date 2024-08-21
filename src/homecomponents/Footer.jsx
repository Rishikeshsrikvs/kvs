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
              <Link to="https://www.facebook.com/people/SRI-KVS-TECH/61554300315348/?_rdr" target="_blank" ><img src={fbicon} alt="Facebook" /></Link>
              <Link to="https://in.linkedin.com/company/srikvs" target="_blank"><img src={inicon} alt="LinkedIn" /></Link>
              <Link to="https://www.instagram.com/srikvstech/" target="_blank"><img src={instaicon} alt="Instagram" /></Link>
            </div>
        </div>
        <div className="footnav footnavleft">
          <p className="footnavhead ">Navigation</p>
          <Link to="about"><p>About Us</p></Link>
          <Link to="services"><p>Services</p></Link>
          <Link to="projects"><p>Projects</p></Link>
          <Link to="blogs"><p>Blogs</p></Link>
          <Link to="career"><p>Careers</p></Link>
        </div>
        <div className="footnav footnavcenter">
          <p className="footnavhead">Services</p>
          <Link to="services"><p>Social Media Marketing</p></Link>
          <Link to="services"><p>Website Designing</p></Link>
          <Link to="services"><p>SEO</p></Link>
        </div>
        <div className="footnav footnavaddress">
          <p className="footnavhead">Contact Us</p>
          <p>+91 7358121384</p>
          <p>+91 7358121385</p>
          <p>info@srikvstech.com</p>
          <p className='footad'>No.19, Kamaraj Nagar,Main Road, Avadi,Chennai-600071</p>
        </div>
    </div>
  );
};
