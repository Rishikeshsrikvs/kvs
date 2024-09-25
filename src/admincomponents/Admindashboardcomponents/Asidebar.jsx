import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/logo.png";
import "./Asidebar.css"; // Assuming you have some CSS to style the sidebar
import feedbackicon from "./../../assets/images/feedback.png";
import projecticon from "./../../assets/images/projecticon.png";
import clienticon from "./../../assets/images/clienticon.png";
import careericon from "./../../assets/images/careericon.png";
import blogicon from "./../../assets/images/blogicon.png";

export const Asidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="listcontainer">
        <ul>
          <li>
            <Link to="clients">
              <span>Clients</span>
              <img src={clienticon} alt="" />
            </Link>
          </li>
          <li>
            <Link to="testimonials">
              <span>Testimonials</span>
              <img src={feedbackicon} alt="" />
            </Link>
          </li>
          <li>
            <Link to="blogs">
              <span>Blogs</span>
              <img src={blogicon} alt="" />
            </Link>
          </li>
          <li>
            <Link to="career">
              <span>Career</span>
              <img src={careericon} alt="" />
            </Link>
          </li>
          <li>
            <Link to="projects">
              <span>Projects</span>
              <img src={projecticon} alt="" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
