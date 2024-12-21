import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Works.css";
import { Link } from "react-router-dom";
import Workmarq from "./landcomponents/Workmarq";
import leftbig from "./../assets/images/workimages/work1leftbig.png";
import leftsmall from "./../assets/images/workimages/work1leftsmall.png";
import rightsmall from "./../assets/images/workimages/work1rightsmall.png";
import rightbig from "./../assets/images/workimages/work1rightbig.png";
import workrect from "./../assets/images/workimages/landrect.png";
import next from "./../assets/images/next.png";
import Workproject from "./Workproject";
import Feedbacklandslider from "./landcomponents/Feedbacklandslider";
import pre from "./../assets/images/pre.png";
import wk1 from "./../assets/images/workimages/flex/wk1.png";
import wk2 from "./../assets/images/workimages/flex/wk2.png";
import wk3 from "./../assets/images/workimages/flex/wk3.png";
import wk4 from "./../assets/images/workimages/flex/wk4.png";
import wk5 from "./../assets/images/workimages/flex/wk5.png";
const Works = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 2000, // Animation duration in ms
      once: false, // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="workparentcontainer">
      <Helmet>
        <title>
          Projects by Sri KVS Tech - Innovative IT & Digital Marketing Solutions
        </title>
        <meta
          name="description"
          content="Explore Sri KVS Tech's portfolio of successful projects in IT solutions, Web development, and digital marketing, showcasing innovation and business impact."
        />
        <link rel="canonical" href="https://srikvstech.com/projects" />
      </Helmet>
      <div className="work1main">
        <img src={workrect} alt="" className="work1rect" />
        <div className="work1mainsub">
          <div className="work1left" data-aos="fade-right">
            <img className="w1lb" src={leftbig} alt="" />
            <img className="w1ls" src={leftsmall} alt="" />
          </div>
          <div className="work1center" data-aos="zoom-in">
            <h1>
              Our Recent <br />
              <span>work</span>
            </h1>
            <p>This is some of our latest design and/or development work.</p>
            <div className="work1btn" data-aos="zoom-in">
              scroll down <br /> <span className="arrow"></span>
            </div>
          </div>
          <div className="work1right" data-aos="fade-left">
            <img className="w1rb" src={rightbig} alt="" />
            <img className="w1rs" src={rightsmall} alt="" />
          </div>
        </div>
      </div>
      <Workproject />
      <Workmarq />
      <div className="work4main">
        <div className="work4cards">
          <img src={wk1} alt="" data-aos="fade-down" />
        </div>
        <div className="work4cards">
          <img src={wk2} alt="" data-aos="fade-down" />
        </div>
        <div className="work4cards">
          <img src={wk3} alt="" data-aos="fade-down" />
        </div>
        <div className="work4cards">
          <img src={wk4} alt="" data-aos="fade-up" />
        </div>
        <div className="work4cards">
          <img src={wk5} alt="" data-aos="fade-up" />
        </div>

        <div className=" work4cardfinal" data-aos="fade-up">
          <h1 data-aos="zoom-in">
            And This Place Is <br />
            <span>Allotted</span> <br />
            Your Project
          </h1>
          <Link to="/contactus" className="workflexbtn" data-aos="zoom-in">
            Get Started Now
          </Link>
        </div>
      </div>
      <Feedbacklandslider />
    </div>
  );
};

export default Works;
